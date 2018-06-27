import React from 'react'
import Login from "./Login";
import {connect} from "react-redux";
import Booking from "./Booking";

const Home = (props) => {
    return (
        <div>
            {!props.isLogged && <div className="container-fluid"><Login /></div>}
            {props.isLogged && <Booking />}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        isLogged: state.loginReducer.isLogged,
    }
}

export default connect(mapStateToProps)(Home)
