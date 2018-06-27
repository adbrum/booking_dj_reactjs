import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadLogin} from "./actions"
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import {MuiThemeProvider} from "@material-ui/core/umd/material-ui.production.min";


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
})

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.loginHandle = this.loginHandle.bind(this)
    }

    loginHandle(event) {
        event.preventDefault()

        let username = this.state.username
        let password = this.state.password

        this.props.loadData({
            'username': username,
            'password': password
        })
    }

    handleEnter(event) {
        if (event.key.keyCode === 13) {
            this.loginHandle(event)
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    render() {
        const {classes} = this.props
        return (
            <MuiThemeProvider>
            <div className="row col-xs-6">
                <form ref="form_bookings" className={classes.container} noValidate autoComplete="off">
                    <div className="col-xs-6 form-group">
                        <TextField style={{fontSize: '14px'}}
                                   className={this.props.classes.margin}
                                   id="username"
                                   label="Nome"
                                   value={this.state.username}
                                   onChange={this.handleChange('username')}
                        />
                        <TextField
                            className={this.props.classes.margin}
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            onKeyUp={(e) => this.handleEnter(e)}
                        />
                        <hr/>
                        <Button style={{fontSize: '14px'}}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            type="submit"
                            onClick={(e) => this.loginHandle(e)}>Login
                        </Button>
                    </div>
                </form>
            </div>
            </MuiThemeProvider>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.loginReducer.isFetching,
        data: state.loginReducer.data,
        error: state.loginReducer.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (value) => dispatch(loadLogin(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))