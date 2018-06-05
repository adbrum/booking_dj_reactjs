import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";

const NavigationItems = (props) => {
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <Link className="navbar-brand" to="/">Agenda de marcações</Link>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/booking">Agendar</Link></li>
                        <li><Link to="/bookings">Agendamentos</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true" aria-expanded="false">
                                {props.login ? props.username.toString() : "Utilizador"}
                                <span className="caret"/></a>
                            <ul className="dropdown-menu">
                                <li><a href="#">Perfil</a></li>
                                <li role="separator" className="divider"/>
                                <li><Link to="/" onClick={props.onClick}>Sair</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        id: state.id,
        username: state.username
    }
}

export default connect(mapStateToProps)(NavigationItems)

