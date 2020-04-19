import React from 'react';
import './CartItem.css';

export default function CartItem({ item }) {
    const { name, images, price } = item;
    const img = images[0].imageFields.file.url;

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
                        <div className="amount-area">0</div>
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
