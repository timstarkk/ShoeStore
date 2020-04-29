import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './Account.css';
import ConfirmForm from './ConfirmForm';

export default class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            phone_number: '',
            confirmationCode: '',
            signedUp: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { signedUp, username, password, email, phone_number, confirmationCode } = this.state;

        const formattedPhoneNumber = phone_number.replace(/\D/g,"");

        if (!signedUp) {
            Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    phone_number: '+1' + formattedPhoneNumber
                }
            })
                .then(() => console.log('signed up'))
                .catch(error => console.log(error))

            this.setState({
                signedUp: true,
                username: '',
                password: ''
            });
        } else {
            Auth.confirmSignUp(username, confirmationCode)
                .then(() => console.log('confirmed sign up'))
                .catch(error => console.log(error))
        }

    }

    handleChange(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        const { signedUp } = this.state;

        if (signedUp) {
            return (
                <ConfirmForm />
            )
        } else {
            return (
                <div className="account-wrapper">
                    <div className="account-section">
                        <div className="container-wrapper">
                            <h4>Create Account</h4>
                            <div className="line" />
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" name="username" placeholder="username" onChange={this.handleChange} />
                                <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
                                <input type="text" name="email" placeholder="email address" onChange={this.handleChange} />
                                <input type="text" name="phone_number" placeholder="phone number" onChange={this.handleChange} />
                                <button>Sign Up</button>
                            </form>
                            <a href="/account/signin">Sign In To Your Account</a>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
