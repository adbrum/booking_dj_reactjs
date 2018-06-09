import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AppBar from '../@material-ui/core/AppBar';
import Toolbar from '../@material-ui/core/Toolbar';
import Typography from '../@material-ui/core/Typography';
import IconButton from '../@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '../@material-ui/core/MenuItem';
import Menu from '../@material-ui/core/Menu';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Button from "../@material-ui/core/es/Button/Button";
import {loadLogout} from "../actions";
import withStyles from '../@material-ui/core/styles/withStyles';
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
        fontSize: 14,
    },
};

class NavigationItems extends Component {
    state = {
        anchorEl: null,
    };

    handleLogout = (event) => {
        this.props.loadLogout()
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        {this.props.isLogged ?
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                <Button className={classes.menuButton}
                                        color="inherit">
                                    <Link to="/" style={{'color': '#ffff'}}>HOME</Link>
                                </Button>
                                <Button className={classes.menuButton} color="inherit">
                                    <Link to="/booking" style={{'color': '#ffff'}}>AGENDAR</Link>
                                </Button>
                                <Button className={classes.menuButton} color="inherit">
                                    <Link to="/bookings" style={{'color': '#ffff'}}>AGENDAMENTOS</Link>
                                </Button>
                            </Typography>
                            :
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                <Button className={classes.menuButton}
                                        color="inherit">
                                    <Link to="/" style={{'color': '#ffff'}}>HOME</Link>
                                </Button>
                            </Typography>
                        }
                        {this.props.isLogged && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                    label="Teste"
                                > {this.props.isLogged ? this.props.data.username.toString() : "Utilizador"} {' '}
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
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Perfil</MenuItem>
                                    <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

NavigationItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

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
let teste = (withStyles(styles)(NavigationItems))
export default connect(mapStateToProps, mapDispatchToProps)(teste)