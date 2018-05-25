import React, {Component} from 'react'
import axios from 'axios'
import api from './api'
import Bookings from "./Bookings";
import {Link} from "react-router-dom";
import Cookies from 'js-cookie'
import DjangoCSRFToken from 'django-react-csrftoken'
import $ from 'jquery';
import jQuery from 'jquery';

window.$ = jQuery;

let csrftoken = Cookies.get('csrftoken');

// import jQuery from "jquery";
// let csrftoken = $.cookie('csrftoken');

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

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
        this.loginHandle = this.loginHandle.bind(this)
    }

    async componentDidMount() {
        await fetch("http://127.0.0.1:8000/admin/login/", {
            method: "POST",
            body: {
                "username": 'admin',
                "password": 'adminum',
            },
            headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Credentials": "true",
                      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                    },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.items)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

        // var getCookie = function (name) {
        //     var cookieValue = null;
        //     if (document.cookie && document.cookie != '') {
        //         var cookies = document.cookie.split(';');
        //         for (var i = 0; i < cookies.length; i++) {
        //             var cookie = jQuery.trim(cookies[i]);
        //             if (cookie.substring(0, name.length + 1) == (name + '=')) {
        //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        //                 break;
        //             }
        //         }
        //     }
        //     return cookieValue;
        // }
        //
        // var csrfSafeMethod = function (method) {
        //     return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        // }
        //
        // // $.ajaxSetup({
        // //     beforeSend: function (xhr, settings) {
        // //         if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        // //             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        // //         }
        // //     }
        // // });
        //
        // $.ajax({
        //
        //     url: 'http://localhost:8000/login/',
        //     type: 'POST',
        //     data: {
        //         username: 'admin',
        //         password: 'adminum',
        //     },
        //     dataType: 'json',
        //     beforeSend: function (xhr, settings) {
        //         if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        //             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        //         }
        //     },
        //     success: function (data) {
        //         alert('Data: ' + data);
        //     },
        //     error: function (request, error) {
        //         alert("Request: " + JSON.stringify(request));
        //     }
        // });

        // using jQuery
        // function getCookie(name) {
        //     var cookieValue = null;
        //     if (document.cookie && document.cookie != '') {
        //         var cookies = document.cookie.split(';');
        //         for (var i = 0; i < cookies.length; i++) {
        //             var cookie = jQuery.trim(cookies[i]);
        //             // Does this cookie string begin with the name we want?
        //             if (cookie.substring(0, name.length + 1) == (name + '=')) {
        //                 cookieValue = decodeURIComponent(
        //                     cookie.substring(name.length + 1)
        //                 );
        //                 break;
        //             }
        //         }
        //     }
        //     return cookieValue;
        // }

        // let csrftoken = getCookie('csrftoken');

        // axios({
        //     method: "post",
        //     url: "http://localhost:8000/admin/login/",
        //     data: {
        //         username: 'admin',
        //         password: 'adminum',
        //     }
        // })
        //     .then(res => {
        //          console.log('RSPONSE: ', res)
        //     })
        //     .catch(err => {
        //         console.log('ERRO: ', err)
        //     })

        // api.post('/api-auth/login/', { username: 'adriano', assword: 'adminum'},
        //     {
        //         headers: {"X-CSRFToken": csrftoken}
        //     })
        //     .then(res => {
        //         console.log('Login', res)
        //     })
        //     .catch(err => {
        //         console.log('Login error', err.response)
        //     });
    }


    loginHandle(event) {
        event.preventDefault()

        let username = this.refs.username.value
        let password = this.refs.password.value

        axios({
            method: "post",
            url: "http://127.0.0.1:8000/api-token-auth/",
            data: {
                username: username,
                password: password,

            },
            // headers: {
            //     "X-CSRFToken": csrftoken,
            //     "Access-Control-Allow-Origin": "*",
            //     // "Access-Control-Allow-Headers": "Origin, X-Requested-with, Content-Type, Accept, Authorization",
            // },
        })
            .then(res => {

            })
            .catch(err => {
                console.log('ERRO: ', err)
            })

        //
        // fetch('http://127.0.0.1:8000/api-token-auth/', {
        //     method: 'POST',
        //     // headers: {
        //     //     Accept: 'application/json',
        //     //     'Content-Type': 'application/json',
        //     //      // "X-CSRFToken": csrftoken,
        //     //      "Access-Control-Allow-Origin": "*",
        //     // },
        //     body: {
        //         username: username,
        //         password: password,
        //     },
        // });
    }

    render() {
        return (
            <div>
                {/*{JSON.stringify(this.state.bookings)}*/}
                <form ref="form_bookings" className="form">
                    <DjangoCSRFToken/>
                    {/*<CSRFToken/>*/}
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