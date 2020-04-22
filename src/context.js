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
        addAmount: 1,
        cartVisible: false,
        cartItemsData: [],
        cartId: ''
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

    afterSignOut = () => {
        this.setState({
            cartItemsData: []
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

                // update cart with new item added
                API.graphql(graphqlOperation(updateCart)).then(() => console.log('update successful')).catch(err => console.log(`you broke it `, err));
            } else {
                // if doesn't exist, create that cart
                const createCart = `
                    mutation {
                        createShoppingCart(input: {
                        userSub: "${userSub}"
                        items: [{
                            itemId: "${itemId}"
                            amount: ${this.state.addAmount}
                        }]
                        }) { 
                            id 
                            userSub 
                            items {
                                itemId
                                amount
                            }
                        }
                    }
                `

                // create cart with selected item and amount
                API.graphql(graphqlOperation(createCart)).then(() => console.log('cart created successfully')).catch(err => console.log(`whoops `, err));
            }

        }).catch(err => console.log(err))
    };

    toggleCart = () => {
        this.getCartItems();
        this.setState({
            cartVisible: !this.state.cartVisible
        });
    };

    getCartItems = () => {
        Auth.currentSession()
            .then(data => {
                let userSub = data.accessToken.payload.sub;
                const getCart = `
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

                API.graphql(graphqlOperation(getCart)).then(res => {
                    const cartId = res.data.listShoppingCarts.items[0].id
                    let cartItems = res.data.listShoppingCarts.items[0].items

                    this.getCartItemsData(cartItems);
                    this.setState({
                        cartId
                    })
                });
            })
            .catch(err => {
                console.log(err);
            });

    };

    getCartItemsData = (cartItems) => {
        console.log('getting cart items data');
        const cartItemsArray = [];

        for (const item of cartItems) {
            let itemId = item.itemId;
            let amount = item.amount;

            const getItemData = `
                query {
                    getStoreItem(
                    id: "${itemId}"
                    ){
                    fields {
                        images {
                        imageFields {
                            file {
                            url
                            }
                        }
                        }
                        name
                        price
                    }
                    }
                }
            `

            API.graphql(graphqlOperation(getItemData)).then(res => {
                res.data.getStoreItem.fields.amount = amount;
                res.data.getStoreItem.fields.itemId = itemId;
                cartItemsArray.push(res.data.getStoreItem.fields);

                this.setState({
                    cartItemsData: cartItemsArray
                })
            }).catch(err => console.log(err.message));
        }
    };

    handlePlusMinus = (itemId, amount, operator, index) => {
        const cartId = this.state.cartId;
        const userSub = this.state.currentUser.sub

        if (operator === "plus") {
            amount++;
        } else {
            amount--;
        }

        let updatedItem = {
            itemId,
            amount
        }


        const getCurrentCart = `
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

        API.graphql(graphqlOperation(getCurrentCart)).then(res => {
            let cartItems = res.data.listShoppingCarts.items[0].items;
            for (const [index, item] of cartItems.entries()) {
                if (item.itemId === itemId) {
                    cartItems[index].amount = amount;
                }
            }

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

            API.graphql(graphqlOperation(updateCart)).then(res => {
                let cartItemsData = this.state.cartItemsData;
                cartItemsData[index].amount = amount;
                this.setState({
                    cartItemsData
                });
            }).catch(err => console.log(err));
        })
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
                resetAddAmount: this.resetAddAmount,
                toggleCart: this.toggleCart,
                getCartItems: this.getCartItems,
                getCartItemsData: this.getCartItemsData,
                afterSignOut: this.afterSignOut,
                handlePlusMinus: this.handlePlusMinus
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