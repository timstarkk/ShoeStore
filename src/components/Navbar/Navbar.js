import React, { Component } from 'react';
import './Navbar.css';
// import logo from '../../images/logo.png';
import { GoThreeBars as Hamburger } from "react-icons/go";
import { MdAccountCircle as AccountIcon } from "react-icons/md";
import { Link, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';


class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            isOpen: false,
            scrolled: false,
            showAccountMenu: false
        }

        this.accountButtonClick = this.accountButtonClick.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    listenScrollEvent = e => {
        if (window.scrollY > 400) {
            this.setState({ scrolled: true })
        } else {
            this.setState({ scrolled: false })
        }
    }

    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    componentDidMount() {
        window.addEventListener("scroll", this.listenScrollEvent)
    }

    getLocation() {
        return this.props.location.pathname;
    }

    accountButtonClick() {
        // console.log('you clicked the account button')
        Auth.currentSession()
            .then(data => {
                let sub = data.accessToken.payload.sub;
                console.log(data);
                console.log(sub);
                // this.setState({
                //     sub
                // })
            })
            .catch(err => console.log(err));

        this.setState({ showAccountMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({ showAccountMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    handleSignOut() {
        console.log('you clicked sign out')
        Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <nav className={"navbar " + (this.state.scrolled ? "nav-scrolled" : "") + (this.getLocation() !== '/' ? " nav-white" : "")}>
                    <div className="nav-center">
                        <div className="nav-header">
                            <Link to="/" className="text-link">
                                <div className="logo-div">
                                    <p className={"logo-text " + (this.state.scrolled ? "nav-scrolled" : "") + (this.getLocation() !== '/' ? " nav-white" : "")}>
                                        ShoeStore
                                </p>
                                </div>
                                {/* <img src={logo} alt="logo" style={{ width: "250px", height: "auto" }} /> */}
                            </Link>
                            <button type="button" className="nav-btn" onClick={this.handleToggle}>
                                <Hamburger className={"nav-icon " + (this.state.scrolled ? 'nav-scrolled' : '') + (this.getLocation() !== '/' ? " nav-white" : "")} />
                            </button>
                        </div>
                        <ul className={this.state.isOpen ? "nav-links show-nav nav-scrolled" : "nav-links " + (this.state.scrolled ? 'nav-scrolled' : '') + (this.getLocation() !== '/' ? " nav-white" : "")}>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/store">Store</Link>
                            </li>
                            <li>
                                <Link to="#">About</Link>
                            </li>
                            <li>
                                <Link onClick={() => this.accountButtonClick()}><AccountIcon id="account-link" /></Link>
                            </li>
                        </ul>
                    </div >
                </nav >

                {
                    this.state.showAccountMenu
                        ? (
                            <div className="account-container-container">
                                <div className="account-container">
                                    <div className="account-menu">
                                        <button className="btn"> Sign In </button>
                                        <button className="btn sign-out" onClick={() => this.handleSignOut()}> Sign Out </button>
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            null
                        )
                }
            </>
        );
    }
};

export default withRouter(Navbar);