import React, { Component } from 'react';
import { ItemContext } from '../../context';
import { Link } from 'react-router-dom';

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

        if (!item) {
            return <div className="error">
                <h3>item not found.</h3>
                <Link to='/store' className='btn btn-primary'>
                    back to store
                </Link>
            </div>
        }

        return (
            <div>
                hello from item page
            </div>
        )
    }
}
