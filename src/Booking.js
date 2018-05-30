import React, {Component} from 'react'
import axios from 'axios'

import {Route} from "react-router-dom";
import Success from "./Success";
import Event from "./BigCalendar";

class Booking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bookings: [],
            redirect: ''
        }

        this.addBooking = this.addBooking.bind(this)
        this.cancelBooking = this.cancelBooking.bind(this)
        this.addEvent = this.addEvent.bind(this)
    }

    componentDidMount() {
        // axios.get(`/bookings/${this.props.user}`)
        axios.get(`/bookings/1`)
            .then(res => {
                const bookings = res.data
                console.log('BOOKINGS: ', bookings)
                this.setState({bookings: bookings})
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    addBooking = (event) => {
        event.preventDefault()

        if (this.refs.name.value !== '') {

            let author = 1
            let name = this.refs.name.value
            let date = this.refs.date.value
            let description = this.refs.description.value

            let booking = {
                author,
                name,
                date,
                description
            }

            let bookings = this.state.bookings

            bookings.push(booking)

            this.setState({
                bookings: bookings
            })

            axios.post(`/booking/create/`, booking)
                .then(res => {
                    // console.log(res);
                    // console.log(res.data);
                    this.setState({
                        bookings: res.data,
                        redirect: 'success'
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    addEvent = (event, data) => {
        event.preventDefault()
        console.log(data)
    }

    cancelBooking = (event) => {
        event.preventDefault()
        this.refs.form_bookings.reset()
        this.refs.name.focus()
    }

    render() {
        if (this.state.redirect === 'success') {
            // return <Route render={() => (<Redirect to="/success" data={this.state.bookings}/>)} />
            return <Route render={(props) => <Success data={this.state.bookings} {...props} format={(value, name) => value === '' ? null : value}/>}/>
        }
        return (
            <div>
                {/*{JSON.stringify(this.state.bookings)}*/}
                <Route render={(props) => <Event data={this.state.bookings} {...props}/>}/>
                {/*<h2>Adicionar nova marcação</h2>
                <form ref="form_bookings" className="form">
                    <div className="col-xs-6 form-group">
                        <label htmlFor="">Nome</label>
                        <input type="text" ref="name" placeholder="Nome para a marcação" className="form-control"/>

                        <label htmlFor="">Data</label>

                        <input type="text" ref="date" placeholder="__/__/___" className="form-control"/>

                        <label htmlFor="">Descrição</label>
                        <textarea type="text" ref="description" placeholder="Descrição" className="form-control"/>
                        <hr/>
                        <button type="submit" onClick={(e) => this.addBooking(e)} className="btn btn-success">Salvar
                        </button>
                        {' '}
                        <button type="submit" onClick={(e) => this.cancelBooking(e)}
                                className="btn btn-primary">Cancelar
                        </button>
                    </div>
                </form>*/}
            </div>
        )
    }
}

export default Booking