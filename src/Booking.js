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
        this.editBooking = this.editBooking.bind(this)
    }

    componentDidMount() {
        // axios.get(`/bookings/${this.props.user}`)
        axios.get(`/bookings/1`)
            .then(res => {
                const bookings = res.data
                // console.log('BOOKINGS: ', bookings)
                this.setState({bookings: bookings})
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    addBooking = (data) => {
        let author = 1
        let title = data[0].title
        let start = data[0].start
        let end = data[0].end

        let booking = {
            author,
            title,
            start,
            end,
        }

        let bookings = this.state.bookings

        bookings.push(booking)

        this.setState({
            bookings: bookings
        })

        axios.post(`/booking/create/`, booking)
            .then(res => {
                // console.log(res);
                // console.log('XXXXXXXX: ',res.data);
                this.setState({
                    bookings: res.data,
                    redirect: ''
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    editBooking = (data) => {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX: ', data)
    }


    cancelBooking = (event) => {
        event.preventDefault()
        this.refs.form_bookings.reset()
        this.refs.name.focus()
    }

    render() {
        /*if (this.state.redirect === 'success') {
            // return <Route render={() => (<Redirect to="/success" data={this.state.bookings}/>)} />
            return <Route render={(props) => <Success data={this.state.bookings}
                                                      {...props}
                                                      format={(value, name) => value === '' ? null : value}/>}/>
        }*/
        return (
            <div>
                {/*{JSON.stringify(this.state.bookings)}*/}
                <Route render={(props) => <Event data={this.state.bookings}
                                                 addBooking={(data) => this.addBooking(data)}
                                                 editEvent={(data) => this.editBooking(data)}
                                                 {...props}/>}/>
            </div>
        )
    }
}

export default Booking