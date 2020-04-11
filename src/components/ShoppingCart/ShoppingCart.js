import React, { Component } from 'react'
import { ItemContext } from '../../context';
import './ShoppingCart.css';

export default class ShoppingCart extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();
    }

    render() {
        let { toggleCart, cartVisible } = this.context;
        let visibility = "hide";

        console.log(cartVisible);
        if (cartVisible) {
            console.log('show');
            visibility = "show";
        };

        return (
            <>
                <div id="menu-background" className={visibility} onClick={() => toggleCart()} />
                <div id="flyout-menu" className={visibility}>
                    <button onClick={() => toggleCart()}>close</button>
                    <p>hello from Shopping Cart</p>
                </div>
            </>
        )
    }
}
