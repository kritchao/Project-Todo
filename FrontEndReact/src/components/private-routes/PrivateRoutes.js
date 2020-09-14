import React from 'react'
import ConfigRoutes from '../../config/routes'
import { Redirect, Switch, Route } from 'react-router-dom';


function PrivateRoutes(props) {
    const role = props.role;

    const allowedRoutes = ConfigRoutes[role].allowedRoutes;
    const redirectRoute = ConfigRoutes[role].redirectRoutes;
    return (
        <Switch>
            {allowedRoutes.map(route => (
                <Route
                    path={route.url}
                    key={route.url}
                    exact
                >
                    <route.component setRole={props.setRole} />
                </Route>
            ))}
            <Redirect to={redirectRoute} />
        </Switch>
    )
}

export default PrivateRoutes
