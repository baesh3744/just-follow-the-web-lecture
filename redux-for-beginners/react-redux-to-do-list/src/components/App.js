import { Route, HashRouter as Router } from "react-router-dom";

import Detail from "../routes/Detail";
import Home from "../routes/Home";
import React from "react";

function App() {
    return (
        <Router>
            <Route path='/' exact component={Home} />
            <Route path='/:id' exact component={Detail} />
        </Router>
    );
}

export default App;
