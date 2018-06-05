import React, {Component} from 'react'
import Booking from "./Booking";
import Login from "./Login";
import {DisplayLogin} from "./DisplayLogin";
import {connect} from "react-redux";
import {loginSuccess} from "./actions";


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: '',
            redirect: false,
        }
    }

    handleUser = (user) =>{
        console.log('#############: ', user)
        this.setState({user: user})
    }

    handleShow = () =>{
        this.setState({redirect: true})
    }

    render() {
        return (
            <div>
                {this.state.redirect && <Booking user={this.state.user}/>}
                {!this.props.id && !this.state.redirect &&
                <Login redirect={this.handleShow}
                       user={(user) => this.handleUser(user)}
                />}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        login: state.login,
        id: state.id,
        username: state.username
    }
}

export default connect(mapStateToProps)(Home)
