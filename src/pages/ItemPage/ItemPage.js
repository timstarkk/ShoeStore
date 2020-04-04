import React, { Component } from 'react';
import { ItemContext } from '../../context';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import './ItemPage.css';
import Footer from '../../components/Footer/Footer';

export default class ItemPage extends Component {
    static contextType = ItemContext;

    constructor(props) {
        super(props);

        this.state = {
            slug: this.props.match.params.slug
        }
    }

    render() {
        const { getItem, addAmount, handleChange, addAmountButton } = this.context;
        const item = getItem(this.state.slug);
        if (!item) {
            return <div className="error">
                <h3>item not found.</h3>
                <Link to='/store' className='btn btn-primary'>
                    back to store
                </Link>
            </div>
        }

        const { name, price, images } = item;

        const img = images[0];

        return (
            <>
                <section className="item-page">
                    <div className="container-wrapper">
                        <div className="item-grid">
                            <div className="item-img-area">
                                <img src={img} alt="" />
                            </div>
                            <div className="item-text-area">
                                <h4>{name}</h4>
                                <h5>${price}</h5>
                                <p>Shipping calculated at checkout.</p>
                                <div className="line"></div>
                                <div className="add-to-cart">
                                    <FaMinusCircle className="minus-one" onClick={() => addAmountButton('minus')} />
                                    <div className="num-display">
                                        <input
                                            type="text"
                                            name="addAmount"
                                            className="num-box"
                                            value={addAmount}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <FaPlusCircle className="plus-one" onClick={() => addAmountButton('plus')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }
}