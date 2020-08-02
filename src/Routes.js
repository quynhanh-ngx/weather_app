import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Main from "./Main/Main";
import About from "./About/About";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Main}/>
                    <Route path="/About" component={About}/>
                </Switch>
            </Router>
        )
    }
}