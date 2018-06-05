import React from 'react'
import Login from "./Login";
import {connect} from "react-redux";

const Home = (props) => {
    return (
        <div>
            {!props.login && <Login redirect={this.handleShow}/>}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

export default connect(mapStateToProps)(Home)
