import React, {Component} from 'react';
import {Route, Router, Switch} from 'react-router-dom'
import axios from "axios/index";
import Home from "./Home";
import Bookings from "./Bookings";
import Booking from "./Booking";
import history from './history'
import NavigationItems from "./NavigationItems/NavigationItems";
import Success from "./Success";
import ErrorBoundary from "./ErrorBoundary";

class App extends Component {

    handleLogout = () => {
        axios({
            method: "post",
            url: "/api-auth/logout/",
        })
            .then(res => {
                console.log('RESPONSE: ', res)
            })
            .catch(err => {
                console.log('ERRO: ', err)
            })
    }

    render() {
        return (
            <ErrorBoundary>
                <Router history={history}>
                    <div className="container">
                        <NavigationItems onClick={this.handleLogout}/>
                        <hr/>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/bookings' component={Bookings}/>
                            <Route exact path='/booking' component={Booking}/>
                            <Route path='/success' component={Success}/>
                        </Switch>
                    </div>
                </Router>
            </ErrorBoundary>
        );
    }
}

export default App;
