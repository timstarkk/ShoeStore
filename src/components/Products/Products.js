import React, { Component } from 'react';
import { ItemContext } from '../../context';
import './Products.css';

export default class Products extends Component {
    static contextType = ItemContext;
    render() {
        return (
            <section className="products-section">
                <h4>products</h4>
                <div className='line'></div>
                <div>hello from second div</div>
            </section>
        )
    }
}
