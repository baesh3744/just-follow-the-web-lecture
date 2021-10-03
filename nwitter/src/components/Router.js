import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "components/Navigation";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <React.Fragment>
                        <Route exact path='/'>
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path='/profile'>
                            <Profile
                                refreshUser={refreshUser}
                                userObj={userObj}
                            />
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
