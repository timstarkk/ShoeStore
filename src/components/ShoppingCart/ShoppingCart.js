import React, { Component } from 'react'
import { ItemContext } from '../../context';

export default class ShoppingCart extends Component {
    static contextType = ItemContext;
    render() {
        return (
            <div>
                hello from shopping cart
            </div>
        )
    }
}
