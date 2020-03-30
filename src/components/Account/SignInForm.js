import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './Account.css';

export default class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            signedIn: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { signedIn, username, password, email, phone_number } = this.state;
        Auth.signIn({
            username,
            password
        })
            .then(() => console.log('signed in'))
            .catch(error => console.log(error))


        Auth.confirmSignIn(username)
            .then(() => console.log('confirmed sign up'))
            .catch(error => console.log(error))

        this.setState({
            signedIn: true
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        const { signedIn } = this.state;

        if (signedIn) {
            return (
                <div className="account-section">
                    <div className="container-wrapper">
                        <div className="line" />
                        <h1>You have signed in!</h1>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="account-section">
                    <div className="container-wrapper">
                        <h4>Sign In To Your Account</h4>
                        <div className="line" />
                        <form onSubmit={this.handleSubmit}>
                            <label>Username</label>
                            <input type="text" name="username" onChange={this.handleChange} />
                            <label>Password</label>
                            <input type="text" name="password" onChange={this.handleChange} />
                            <button>Sign In</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}
