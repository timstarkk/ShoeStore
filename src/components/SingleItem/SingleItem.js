import React, { Component } from 'react';
import { ItemContext } from '../context';
import './SingleItem.css';

export default class SingleItem extends Component {
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
        return (
            <div>
                hello from {item} page
            </div>
        )
    }
}
