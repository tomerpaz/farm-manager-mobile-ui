import React from 'react';
import {Route} from 'react-router-dom'
import {SigninForm} from '../components/forms';

export const PrivateRoute = ({component: Component, authenticated, ...props}) => (
    <Route {...props} render={routeProps => (
        authenticated ? (
            <Component {...routeProps} {...props} />
        ) : (
            <SigninForm {...routeProps} {...props}/>
        )
    )}/>
);