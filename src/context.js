import React, { Component } from 'react';
import query from './data';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import config from './aws-exports';
import { getDefaultNormalizer } from '@testing-library/react';

Amplify.configure(config);
const ItemContext = React.createContext();
let items = [];

class ItemProvider extends Component {
    state = {
        shopItems: [],
        sortedItems: [],
        featuredItems: [],
        loading: true,
        type: 'all',
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        currentUser: {},
        addAmount: 1
    };

    async componentDidMount() {
        await API.graphql(graphqlOperation(query))
            .then(data => {
                let tempItems = data.data.listStoreItems.items;

                for (let i = 0; i < tempItems.length; i++) {
                    console.log(i);
                    if (items.length === 0) {
                        items.push(tempItems[i]);
                    } else {
                        for (let j = 0; j < items.length; j++) {
                            if (tempItems[i].fields.price < items[j].fields.price) {
                                items.splice(j, 0, tempItems[i]);
                                break;
                            } else if (tempItems[i].fields.price > items[j].fields.price && j === (items.length - 1)) {
                                items.push(tempItems[i])
                            }
                        }
                    }
                }
            })

        let shopItems = this.formatData(items);
        let featuredItems = shopItems.filter(item => item.featured === true)
        let maxPrice = Math.max(...shopItems.map(item => item.price));
        this.setState({
            shopItems,
            featuredItems,
            sortedItems: shopItems,
            loading: false,
            price: maxPrice,
            maxPrice
        })
    };

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.id;
            let images = item.fields.images.map(images => images.imageFields.file.url);
            let tempItem = { ...item.fields, images, id }

            return tempItem
        });

        return tempItems;
    };

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = event.target.name;

        console.log('handling event');
        this.setState({
            [name]: value
        })
    };

    addAmountButton = direction => {
        if (direction === 'minus') {
            if (this.state.addAmount > 1) {
                this.setState({
                    addAmount: this.state.addAmount - 1
                })
            }
        } else if (direction === 'plus') {
            this.setState({
                addAmount: this.state.addAmount + 1
            })
        }
    };

    resetAddAmount = () => {
        this.setState({
            addAmount: 1
        })
    };

    getItem = slug => {
        let tempItems = [...this.state.shopItems];
        const item = tempItems.find(item => item.slug === slug);

        return item;
    };

    setCurrentUser = userInfo => {
        console.log('setting user info');
        console.log(userInfo);
        this.setState({
            currentUser: userInfo
        })
    };

    handleAddToCart = item => {
        if (!this.state.currentUser.username) {
            this.visitorCartAdd(item);
        } else {
            this.userCartAdd(item);
        }
    };

    visitorCartAdd = (item) => {
        const key = item.id;
        if (localStorage.getItem('shoppingCart') !== null) {
            // localStorage.removeItem('shoppingCart');
            console.log(this.state.addAmount);
            let shoppingCart = JSON.parse(window.localStorage.getItem('shoppingCart'));

            if (shoppingCart.items[`${key}`]) {
                shoppingCart.items[`${key}`] = shoppingCart.items[`${key}`] + this.state.addAmount;
                window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            } else {
                shoppingCart.items[`${key}`] = this.state.addAmount
                window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            }
        } else {
            const shoppingCart = {
                items: {
                    [key]: this.state.addAmount
                }
            };
            window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            console.log('added to cart');
        }
    };

    userCartAdd = (item) => {
        let itemId = item.id;
        let userSub = this.state.currentUser.sub;
        let newItem = {
            itemId,
            amount: this.state.addAmount,
        }

        console.log(itemId);
        console.log(userSub);

        // checks for current user cart
        const checkForCart = `
        query {
            listShoppingCarts(filter: {
                userSub: {
                    contains: "${userSub}"
                }
            }) {
                items {
                    id
                    items {
                        itemId
                        amount
                    }
                }
            }
        }
        `

        API.graphql(graphqlOperation(checkForCart)).then(res => {
            let cartExists = res.data.listShoppingCarts.items.length;

            if (cartExists) {
                // retrieve and prepare items data
                let cartId = res.data.listShoppingCarts.items[0].id;
                let cartItems = res.data.listShoppingCarts.items[0].items;
                cartItems.push(newItem);
                let stringifiedItems = JSON.stringify(cartItems);
                let unquotedItems = stringifiedItems.replace(/"([^"]+)":/g, '$1:');

                const updateCart = `
                    mutation {
                        updateShoppingCart(input: {
                        id: "${cartId}"
                        items: ${unquotedItems}
                        }) {items {itemId amount}}
                    }
                `

                // update cart
                API.graphql(graphqlOperation(updateCart)).then(() => console.log('update successful')).catch(err => console.log(`you broke it`, err));
            }

            // if doesn't exist, create that cart
        }).catch(err => console.log(err))
    };

    render() {
        return (
            <ItemContext.Provider value={{
                ...this.state,
                getItem: this.getItem,
                setCurrentUser: this.setCurrentUser,
                handleChange: this.handleChange,
                addAmountButton: this.addAmountButton,
                handleAddToCart: this.handleAddToCart,
                resetAddAmount: this.resetAddAmount
            }}>
                {this.props.children}
            </ItemContext.Provider>
        )
    };
}


const ItemConsumer = ItemContext.Consumer;

export function withItemConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <ItemConsumer>
            {value => <Component {...props} context={value} />}
        </ItemConsumer>
    }
};

export { ItemProvider, ItemConsumer, ItemContext }