import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Auth } from 'aws-amplify';
import './Account.css';

export default class ConfirmForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            confirmationCode: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, confirmationCode } = this.state;

        Auth.confirmSignUp(username, confirmationCode)
            .then(() => console.log('confirmed sign up'))
            .catch(error => console.log(error))

    }

    handleChange(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div className="account-wrapper">
                <div className="account-section">
                    <div className="container-wrapper">
                        <h4>Confirm Account</h4>
                        <div className="line" />
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
                            <input type="text" name="confirmationCode" placeholder="confirmation code" onChange={this.handleChange} />
                            <button>Confirm</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
