import React, {Component} from 'react'
import Booking from "./Booking";
import Login from "./Login";

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: '',
            redirect: false
        }
    }

    render() {
        return (
            <div>
                {this.state.redirect && <Booking user={this.state.user}/>}
                {!this.state.redirect && <Login/>}
            </div>
        )
    }
}

export default Home