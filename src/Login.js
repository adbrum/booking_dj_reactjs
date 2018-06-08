import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadLogin} from "./actions";


class Login extends Component {
    constructor(props) {
        super(props)

        this.loginHandle = this.loginHandle.bind(this)
    }

    loginHandle(event) {
        event.preventDefault()

        let username = this.refs.username.value
        let password = this.refs.password.value

        this.props.loadData({
            'username': username,
            'password': password
        })
    }

    handleEnter(event) {
        if (event.key.keyCode === 13) {
            this.loginHandle(event)
        }
    }

    render() {
        return (
            <div>
                {this.props.error && <h6 className="warning">Username ou password incorretos!</h6>}
                <form ref="form_bookings" className="form">
                    <div className="col-xs-6 form-group">
                        <label htmlFor="">Nome</label>
                        <input type="text" ref="username" placeholder="Nome" className="form-control"/>
                        <label htmlFor="">Password</label>
                        <input type="text" onKeyUp={(e) => this.handleEnter(e)} ref="password" placeholder="senha"
                               className="form-control"/>
                        <hr/>
                        <button type="submit" onClick={(e) => this.loginHandle(e)} className="btn btn-success">Login
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.loginReducer.isFetching,
        data: state.loginReducer.data,
        error: state.loginReducer.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (value) => dispatch(loadLogin(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)