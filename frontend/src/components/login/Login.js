import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import { userLogin } from './../../service';
import { useHistory } from "react-router-dom";

export default function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function onLoginPage(email, password) {
        if (email && password) {
            const checkLogin = await userLogin(email, password);
            if (checkLogin) {
                setError('');
                localStorage.setItem('isLogin', true)
                history.push('/search');
            } else {
                localStorage.setItem('isLogin', false)
                setError('Please check account or password!')
            }
        }
    }

    return (
        <>
            <Navbar />
            <section className="form mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <div className="card bg-white p-4 mb-4">
                                <div className="card-body">
                                    <h1><i className="fas fa-sign-in-alt"></i> Login</h1>
                                    <p>
                                        Log in to list your bootcamp or rate, review and favorite
                                        bootcamps
								    </p>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Enter password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="button"
                                                onClick={() => onLoginPage(email, password)}
                                                className="btn btn-primary btn-block"
                                            >
                                                Login
                                            </button>
                                        </div>
                                        {error && <p style={{ color: 'red', justifyContent: 'center', alignItems: 'center' }}>{error}</p>}
                                    </form>
                                    <p>	Forgot Password? <a href="reset-password.html">Reset Password</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
