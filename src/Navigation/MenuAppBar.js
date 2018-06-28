import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {loadLogout} from "../actions"
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        color: 'inherit'
    },
}

class MenuAppBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            auth: true,
            anchorEl: null,
        }
    }

    handleLogout = (event) => {
        this.props.loadLogout()
    }

    handleChange = (event, checked) => {
        this.setState({auth: checked})
    }

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget})
    }

    handleClose = () => {
        this.setState({anchorEl: null})
    }

    render() {
        const {classes} = this.props
        const {anchorEl} = this.state
        const open = Boolean(anchorEl)

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        {!this.props.isLogged && (
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                <Button href="/" color="inherit" style={{
                                    fontSize: '14px',
                                }}>Home</Button>
                            </Typography>
                        )}
                        {this.props.isLogged && (
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                <Button color="inherit" className={classes.button} component={Link}
                                        style={{fontSize: '14px'}}
                                        to="/">Home</Button>
                                <Button color="inherit" className={classes.button} component={Link}
                                        style={{fontSize: '14px'}}
                                        to="/booking">Agendar</Button>
                                <Button color="inherit" className={classes.button} component={Link}
                                        style={{fontSize: '14px'}}
                                        to="/bookings">Agendamentos</Button>
                            </Typography>
                        )}
                        {this.props.isLogged ?
                            (
                                <div>
                                    {this.props.data.username.toString()}
                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit">
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={this.handleClose}>
                                        <MenuItem onClick={this.handleClose}>Perfil</MenuItem>
                                        <MenuItem onClick={this.handleClose}>Minha conta</MenuItem>
                                        <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
                                    </Menu>
                                </div>
                            ) : ""}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        data: state.loginReducer.data,
        isLogged: state.loginReducer.isLogged,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadLogout: () => dispatch(loadLogout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MenuAppBar))
