import React, {Component} from 'react';
import {Route, Router, Switch} from 'react-router-dom'
import Home from "./Home";
import Bookings from "./Bookings";
import Booking from "./Booking";
import history from './history'
import NavigationItems from "./Navigation/NavigationItems";
import Logout from "./Logout";
import ErrorBoundary from "./ErrorBoundary";
import {connect} from 'react-redux'

class App extends Component {
    render() {
        return (
            <ErrorBoundary>
                <Router history={history}>
                    <div className="container">
                        <NavigationItems/>
                        <hr/>
                        {this.props.login ?
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route path='/bookings' component={Bookings}/>
                                <Route exact path='/booking' component={Booking}/>
                                <Route path='/logout' component={Logout}/>
                            </Switch>
                            : <Route exact path='/' component={Home}/>}
                    </div>
                </Router>
            </ErrorBoundary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(App)