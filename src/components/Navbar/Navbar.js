import React, { Component } from 'react';
import './Navbar.css';
// import logo from '../../images/logo.png';
import { GoThreeBars as Hamburger } from "react-icons/go";
import { Link, withRouter } from 'react-router-dom';


class Navbar extends Component {
    state = {
        isOpen: false,
        scrolled: false
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

    render() {
        return (
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
                    </ul>
                </div >
            </nav >
        );
    }
};

export default withRouter(Navbar);