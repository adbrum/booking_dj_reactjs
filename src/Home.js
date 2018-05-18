import React, {Component} from 'react'
import axios from 'axios'
import Bookings from "./Bookings";
import {Link} from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bookings: [],
            auth: {
                id: 1,
                username: '',
                password: ''
            },
            show: true
        }
    }

    componentDidMount() {
            axios.post('http://127.0.0.1:8000/api-auth/login/', { username: 'adriano', assword: 'adminum'})
                .then(res => {
                    console.log('Login', res)
                })
                .catch(err => {
                    console.log('Login error', err.response)
                });
    }

    render() {
        return (
            <div>
                {/*{JSON.stringify(this.state.bookings)}*/}
                <Link to="/booking" className="btn btn-primary">Nova</Link>
                {!this.state.show &&
                    <Bookings data={this.state.auth}/>}
            </div>
        )
    }

}

export default Home