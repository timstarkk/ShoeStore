import React from 'react';
import './CartItem.css';
import { withItemConsumer } from '../../context';

function CartItem({ item, context }) {
    let { name, images, price, amount } = item;
    const img = images[0].imageFields.file.url;

    price = price * amount;

    return (
        <div className="cart-item">
            <div className="cart-details">
                <img src={img} className="item-img" />
                <div className="cart-info">
                    <h4 className="item-name">{name}</h4>
                    <div className="plus-minus-area">
                        <div className="plus-minus minus-one">
                            -
                        </div>
                        <div className="amount-area">{amount}</div>
                        <div className="plus-minus plus-one">
                            +
                        </div>
                    </div>
                    <p className="item-price">${price}</p>
                </div>
            </div>
            <div className="line" />
        </div>
    )
}

export default withItemConsumer(CartItem);