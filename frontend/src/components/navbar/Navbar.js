import React from 'react'
import {
    Link
  } from "react-router-dom";
export default function Navbar() {
    return (
        <>
            <nav class="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="index.html"
                    ><i class="fas fa-laptop-code"></i> DevCamper</a
                    >
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <Link to="/login">
                                    <a class="nav-link" href="login.html"
                                    ><i class="fas fa-sign-in-alt"></i> Login</a
                                    >
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/register">
                                    <a class="nav-link" href="register.html"
                                    ><i class="fas fa-user-plus"></i> Register</a
                                    >
                                </Link>
                            </li>
                            <li class="nav-item d-none d-sm-block">
                                <a class="nav-link" href="#">|</a>
                            </li>
                            <li class="nav-item">
                                <Link to="/bootcamps">
                                    <a class="nav-link" href="bootcamps.html">Browse Bootcamps</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
