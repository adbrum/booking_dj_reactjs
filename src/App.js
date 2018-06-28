import React, {Component} from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import Home from "./Home"
import Bookings from "./Bookings"
import Booking from "./Booking"
import history from './history'
import ErrorBoundary from "./ErrorBoundary"
import {connect} from 'react-redux'
import {loginReducer} from './reducers/loginReducer'
import MenuAppBar from "./Navigation/MenuAppBar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {classes} = this.props
        if (this.props.error) {
            return (
                <ErrorBoundary>
                    <Router history={history}>
                        <div className="container">
                            {/*<NavigationItems/>*/}
                            <MenuAppBar/>
                            <hr/>
                            <Route exact path='/' component={Home}/>
                        </div>
                    </Router>
                </ErrorBoundary>
            )
        }

        return (
            <ErrorBoundary>
                <Router history={history}>
                    <div className="container">
                        {/*<NavigationItems/>*/}
                        <MenuAppBar/>
                        <Grid container justify="center" item xs={12}>
                            {this.props.isFetching && <CircularProgress className={classes.progress} size={50}/>}
                        </Grid>
                        <hr/>
                        {this.props.isLogged ?
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route path='/bookings' component={Bookings}/>
                                <Route exact path='/booking' component={Booking}/>
                            </Switch>
                            : <Route exact path='/' component={Home}/>}
                    </div>
                </Router>
            </ErrorBoundary>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.loginReducer.isFetching,
        data: state.loginReducer.data,
        isLogged: state.loginReducer.isLogged,
        error: state.loginReducer.error
    }
}

export default connect(mapStateToProps)(withStyles(styles)(App))