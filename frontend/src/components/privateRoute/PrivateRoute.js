import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLogin } from './../../utils/Index';

export default function PrivateRoute({ component: Component, route, ...rest }) {
    console.log(route)
    const _isLogin = isLogin();
    return (
        <Route
            {...rest}
            render={() => _isLogin === true
                ? <Component />
                : <Redirect to={{ pathname: '/login' }} />}
        />
    )
}