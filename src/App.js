import React, {Component} from 'react';
import {Route, Router, Switch} from 'react-router-dom'
import Home from "./Home";
import Bookings from "./Bookings";
import Booking from "./Booking";
import history from './history'
import NavigationItems from "./NavigationItems/NavigationItems";
import Success from "./Success";

class App extends Component {


    render() {
        return (
            <Router history={history}>
                <div className="container">
                    <NavigationItems/>
                    <hr/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/bookings' component={Bookings}/>
                        <Route exact path='/booking' component={Booking}/>
                        <Route path='/success' component={Success}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
