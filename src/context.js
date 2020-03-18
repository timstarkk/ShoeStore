import React, { Component } from 'react';
import items from './data';

const ItemContext = React.createContext();

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
    };

    componentDidMount() {
        let shopItems = this.formatData(items);
        console.log(shopItems);
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
            let id = item.sys.id;
            let images = item.fields.images.map(images => images.fields.file.url);
            let tempItem = { ...item.fields, images, id }

            return tempItem
        });

        return tempItems;
    };

    getItem = (slug) => {
        let tempItems = [...this.state.shopItems];
        const item = tempItems.find(item => item.slug === slug);

        return item;
    }

    render() {
        return (
            <ItemContext.Provider value={{
                ...this.state,
                getItem: this.getItem,
                // handleChange: this.handlechange
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