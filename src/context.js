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
            let item = { ...item.fields, images, id }

            return item
        });

        return tempItems;
    };



    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                // getRoom: this.getRoom,
                // handleChange: this.handlechange
            }}>
                {this.props.children}
            </RoomContext.Provider>
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