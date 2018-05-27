import React, {Component} from 'react'
import axios from 'axios'
import Bookings from "./Bookings";
import {Link} from "react-router-dom";

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
            show: true,
            users: []
        }
        this.loginHandle = this.loginHandle.bind(this)
    }

    loginHandle(event) {
        event.preventDefault()

        let username = this.refs.username.value
        let password = this.refs.password.value

        axios({
            method: "post",
            url: "/login/",
            data: {

                username: username,
                password: password,

            },
        })
            .then(res => {
                console.log('RESPONSE: ', res)
                axios({
                        method: "get",
                        url: "http://localhost:8000/api/",
                    },
                )
                    .then(res => {
                        console.log('RSPONSE: ', res)
                    })
                    .catch(err => {
                        console.log('ERRO: ', err)
                    })
            })
            .catch(err => {
                console.log('ERRO: ', err)
            })
    }

    render() {
        return (
            <div>
                <form ref="form_bookings" className="form">
                    <div className="col-xs-6 form-group">
                        <label htmlFor="">Nome</label>
                        <input type="text" ref="username" placeholder="Nome" className="form-control"/>

                        <label htmlFor="">Password</label>
                        <input type="text" ref="password" placeholder="senha" className="form-control"/>
                        <hr/>
                        <button type="submit" onClick={(e) => this.loginHandle(e)} className="btn btn-success">Login
                        </button>
                    </div>
                </form>

                <Link to="/booking" className="btn btn-primary">Nova</Link>
                {!this.state.show &&
                <Bookings data={this.state.auth}/>}
            </div>
        )
    }

}

export default Home