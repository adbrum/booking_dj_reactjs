import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginSuccess} from "./actions";

class Login extends Component {
    constructor(props) {
        super(props)

        this.loginHandle = this.loginHandle.bind(this)
    }

    componentDidMount() {
        console.log('#################### --', this.props.login)
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
                this.props.loginSuccess(true)
            })
            .catch(err => {
                console.log('ERRO: ', err)
            })
    }

    render() {
        return (
            <div>
                LOGIN: {this.props.login.toString()}
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
                <button onClick={() => this.props.loginSuccess(true)}>-</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (value) => dispatch(loginSuccess(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)