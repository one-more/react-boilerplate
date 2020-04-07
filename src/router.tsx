import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '~/modules/user';
import { appRoutes } from '~/routes';
import { LoginPage } from '~/pages/login';

export function AppRouter(): JSX.Element {
    if (isAuthenticated()) {
        return (
            <Router>
                <Route path="/" exact component={(): JSX.Element => <div data-target="index-page">Main page</div>} />
            </Router>
        );
    }
    return (
        <Router>
            <Route
                render={({ location }): JSX.Element =>
                    location.pathname == appRoutes.login ? <LoginPage /> : <Redirect to={appRoutes.login} />
                }
            />
        </Router>
    );
}
