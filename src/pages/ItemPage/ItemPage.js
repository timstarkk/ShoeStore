import React, { Component } from 'react';
import { ItemContext } from '../../context';
import { Link } from 'react-router-dom';
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
        const { getItem } = this.context;
        const item = getItem(this.state.slug);
        console.log(item);
        if (!item) {
            return <div className="error">
                <h3>item not found.</h3>
                <Link to='/store' className='btn btn-primary'>
                    back to store
                </Link>
            </div>
        }

        const { name, type, price, description, images } = item;

        const img = images[0];
        console.log(images);

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
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }
}
