import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './../../Login/useAuth';
import logo from './../../../images/logo.png';
import './Header.css'

const Header = () => {

    const auth = useAuth()

    const path = useLocation().pathname

    return (
        <div>
            {
                auth.user &&
                <>
                    {
                        auth.user.verified === false &&
                        <div className="alert alert-primary alert-dismissible fade show" role="alert">
                            <span>We are send a verification link on your email address. Please verify your email.</span>
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    }
                </>
            }
            <header className="ema-john-app-header" style={{ marginTop: "5px" }}>
                <div className="logo" style={{ textAlign: 'center', width: "285px", height: "70px", margin: "0 auto" }}>
                    <Link to="/">
                        <img style={{ height: "60px", width: "auto" }} src={logo} alt="" />
                    </Link>
                </div>

                <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                    <div class="container-fluid">
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-5 text-light">
                                <li class="nav-item">
                                    <Link className={path ===  "/" ? "nav-link px-4 text-light active-nav" : "nav-link px-4 text-light"} to="/">Shop</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className={path === "/inventory" ? "nav-link px-4 text-light active-nav" : "nav-link px-4 text-light" } to="/inventory">Inventory</Link>
                                </li>
                            </ul>

                            <ul className="me-5 navbar-nav">
                                {
                                    path === "/" ?
                                        ""
                                        :
                                        <li class="nav-item">
                                            <Link className="nav-link px-4 text-light bg-dark me-2" style={{ marginTop: "-3px" }} to="/cart">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
                                                    <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
                                                </svg>
                                            </Link>
                                        </li>
                                }
                                <li className="nav-item">
                                    {
                                        auth.user ?
                                            <div class="dropdown">
                                                <div class="text-dark mt-2" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#fff', display: 'flex', width: '' }}>
                                                    <img style={{ width: '35px', height: '35px', borderRadius: '50%', marginTop: '-7px', marginRight: '5px' }} src={auth.user.photo} alt="" />
                                                    <span className="text-light">{auth.user.name}</span>
                                                </div>
                                                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                                    <li><Link class="dropdown-item" to="/profile">Profile</Link></li>
                                                    <li><Link onClick={auth.singOut} className="dropdown-item">Sign Out</Link></li>
                                                </ul>
                                            </div>
                                            :
                                            <a className="nav-link text-light" style={{ cursor: 'pointer' }} href="/login">
                                                <span>Sign In</span>
                                            </a>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;