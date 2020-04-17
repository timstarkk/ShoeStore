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
                    <p className="item-price">${price}</p>
                </div>
            </div>
            <div className="line" />
        </div>
    )
}
