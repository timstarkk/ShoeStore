import React, { Component } from 'react'
import { ItemContext } from '../../context';
import { MdClose as CloseButton } from "react-icons/md";
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
            visibility = 'show';
            document.getElementById('app-container').classList.add('show');
        } else {
            if (document.getElementById('app-container') !== null) {
                document.getElementById('app-container').classList.remove('show');
            }
        };

        return (
            <>
                <div id="menu-background" className={visibility} onClick={() => toggleCart()} />
                <div id="flyout-menu" className={visibility}>
                    <CloseButton id="close-button" onClick={() => toggleCart()} />
                    <h4>Your Cart</h4>
                    <div className="line" />
                    <div id="cart-items-area">
                        <p>this is where the cart items will go</p>
                    </div>
                    <div className="line" />
                    <div id="subtotal-area">
                        <p>subtotal:</p>
                    </div>
                </div>
            </>
        )
    }
}
