import React, {Component} from 'react'
import Booking from "./Booking";
import Login from "./Login";
import {DisplayLogin} from "./DisplayLogin";

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
                {!this.state.redirect && <Login redirect={this.handleShow} user={(user) => this.handleUser(user)}/>}
            </div>
        )
    }
}

export default Home