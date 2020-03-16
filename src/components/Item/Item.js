import React from 'react';
import { Link } from 'react-router-dom';
import defaultImg from '../../images/placeholder480.jpg';
import PropTypes from 'prop-types';

export default function Item({ item }) {
    const { name, slug, images, price } = item;
    return (
        <article className="item">
            <div className="img-container">
                <img src={images[0] || defaultImg} alt="item option" />
                {/* <Link to={`/rooms/${slug}`} className="btn-primary room-link">Features</Link> */}
                <div className="price-top">
                    <h6>{name} - ${price}</h6>
                </div>
            </div>
        </article>
    )
};

Item.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired
    })
};