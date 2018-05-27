import React from 'react';
import {Link} from 'react-router-dom'

const navigationItems = (props) => (

    <nav className="navbar navbar-inverse">
        <div className="container">
            <div className="navbar-header">
                <a href="/" className="navbar-brand">
                    Agenda de marcações
                </a>
            </div>
            <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/booking">Agendar</Link></li>
                <li><Link to="/bookings">Agendamentos</Link></li>
                <li><Link to="/" onClick={props.onClick}>Logout</Link></li>
            </ul>

        </div>

    </nav>
)

export default navigationItems;