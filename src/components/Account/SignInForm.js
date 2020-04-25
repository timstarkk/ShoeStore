import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Auth } from 'aws-amplify';
import './Account.css';
import { ItemContext } from '../../context';

export default class SignInForm extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            signedIn: false,
            setCurrentUser: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(e) {
        const { setCurrentUser } = this.context;
        this.setState({
            setCurrentUser
        })

        e.preventDefault();
        const { signedIn, username, password, email, phone_number } = this.state;
        await Auth.signIn({
            username,
            password
        })
            .then(() => console.log('signed in'))
            .catch(error => console.log(error))


        await Auth.confirmSignIn(username)
            .then(() => console.log('confirmed sign up'))
            .catch(error => console.log(error))

        await Auth.currentSession()
            .then(data => {
                let userInfo = data.accessToken.payload;
                this.state.setCurrentUser(userInfo);
            })
            .catch(err => {
                console.log(err.message);
                console.log(this.state.signedIn)
            });

        this.setState({
            signedIn: true,
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
                <div className="account-wrapper">
                    <div className="account-section">
                        <div className="container-wrapper">
                            <div className="line" />
                            <h1>You have signed in!</h1>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="account-wrapper">
                    <div className="account-section">
                        <div className="container-wrapper">
                            <h4>Sign In To Your Account</h4>
                            <div className="line" />
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" name="username" placeholder="username" onChange={this.handleChange} />
                                <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
                                <button>Sign In</button>
                            </form>
                            <a href="/account/signup">create an account</a>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
