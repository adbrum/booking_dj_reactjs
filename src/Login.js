import React, {Component} from 'react'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)

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
                console.log('RESPONSE: ', res.data)
                this.props.redirect()
                this.props.user(res.data.user)
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
            </div>
        )
    }
}

export default Login