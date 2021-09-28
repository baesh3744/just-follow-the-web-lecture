import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "components/Navigation";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <React.Fragment>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/profile'>
                            <Profile />
                        </Route>
                    </React.Fragment>
                ) : (
                    <Route exact path='/'>
                        <Auth />
                    </Route>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;
