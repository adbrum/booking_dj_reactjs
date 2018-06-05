import React, {Component} from 'react';
import {Route, Router, Switch} from 'react-router-dom'
import axios from "axios/index";
import Home from "./Home";
import Bookings from "./Bookings";
import Booking from "./Booking";
import history from './history'
import NavigationItems from "./NavigationItems/NavigationItems";
import Logout from "./Logout";
import ErrorBoundary from "./ErrorBoundary";
import {connect} from 'react-redux'
import {loginSuccess} from "./actions";


class App extends Component {

    // handleLogout = () => {
    //     axios({
    //         method: "post",
    //         url: "/api-auth/logout/",
    //     })
    //         .then(res => {
    //             this.props.loginSuccess(false)
    //             console.log('RESPONSE: ', res)
    //         })
    //         .catch(err => {
    //             console.log('ERRO: ', err)
    //         })
    // }

    render() {
        return (
            <ErrorBoundary>
                <Router history={history}>
                    <div className="container">
                        {/*<DisplayLogin/>*/}
                        {/*<NavigationItems onClick={this.handleLogout}/>*/}
                        <NavigationItems />
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginSuccess: (value) => dispatch(loginSuccess(value)),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default connect(mapStateToProps)(App)