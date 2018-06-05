import React from 'react'
import axios from "axios/index";
import {logout} from "./actions";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const Logout = (props) => {
    axios({
        method: "post",
        url: "/api-auth/logout/",
    })
        .then(res => {
            props.logout(false)
        })
        .catch(err => {
            console.log('ERRO: ', err)
        })

    return <Route render={() => (<Redirect to="/"/>)}/>
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: (value) => dispatch(logout(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)