import React, { Component } from 'react'
import { ItemContext } from '../../context';

export default class ShoppingCart extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();

        this.state = {
            cartVisible: false
        }
    }



    render() {
        return (
            <div>
                hello from shopping cart
            </div>
        )
    }
}
