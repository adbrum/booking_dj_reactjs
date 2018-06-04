import React, {Component} from 'react'
import axios from 'axios'

import {Route} from "react-router-dom";
import Event from "./BigCalendar";

class Booking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bookings: [],
            redirect: '',
            hex_color: '',
            type: 'save',

        }

        this.addBooking = this.addBooking.bind(this)
        this.cancelBooking = this.cancelBooking.bind(this)
        this.editBooking = this.editBooking.bind(this)
        this.deleteBooking = this.deleteBooking.bind(this)
    }

    editBooking = (data) => {
        this.setState({type: 'edit'})
        axios.post(`/booking/edit/${data[0].id}`,
            {
                author: 1,
                title: data[0].title,
                description: data[0].msg,
                status: data[0].status,
                hex_color: data[0].hex_color
            })
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

    addBooking = (data) => {
        let author = 1
        let title = data[0].title
        let description = data[0].msg
        let start = data[0].start
        let end = data[0].end
        let hex_color = data[0].hex_color

        let booking = {
            author,
            description,
            title,
            start,
            end,
            hex_color,
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

    componentDidMount() {
        // axios.get(`/bookings/${this.props.user}`)
        axios.get(`/bookings/1`)
            .then(res => {
                // console.log('XXXXXXXX: ',res.data);
                const bookings = res.data
                this.setState({bookings: bookings})
            })
            .catch(err => {
                console.log(err.response)
            })

    }

    deleteBooking = (data) => {
        this.setState({type: 'edit'})
        axios.post(`/booking/delete/${data.id}`,
            {
                author: 1,
            })
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
                                                 editBooking={(data) => this.editBooking(data)}
                                                 deleteBooking={(data) => this.deleteBooking(data)}
                                                 {...props}/>}/>
            </div>
        )
    }
}

export default Booking