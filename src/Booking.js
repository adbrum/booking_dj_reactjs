import React, {Component} from 'react'
import axios from 'axios'
import {Route} from "react-router-dom";
import Event from "./BigCalendar";
import {connect} from "react-redux";
import {loadBooking} from "./actions";


class Booking extends Component {
    constructor(props) {
        super(props)

        this.addBooking = this.addBooking.bind(this)
        this.cancelBooking = this.cancelBooking.bind(this)
        this.editBooking = this.editBooking.bind(this)
        this.deleteBooking = this.deleteBooking.bind(this)
    }

    editBooking = (data) => {
        data['author'] = this.props.data.id
        axios.post(`/booking/edit/${data.id}`, {data})
            .then(() => {
                this.props.loadBookings(this.props.data.id)
            })
            .catch(err => {
                console.log(err)
            })
    }
    addBooking = (data) => {
        data['author'] = this.props.data.id
        axios.post(`/booking/create/`, data)
            .then(() => {
                this.props.loadBookings(this.props.data.id)
            })
            .catch(err => {
                console.log(err)
            })
    }
    deleteBooking = (data) => {
        axios.post(`/booking/delete/${data.id}`, {data})
            .then(() => {
                this.props.loadBookings(this.props.data.id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.props.loadBookings(this.props.data.id)
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
                <Route render={(props) => <Event data={this.props.bookings}
                                                 addBooking={(data) => this.addBooking(data)}
                                                 editBooking={(data) => this.editBooking(data)}
                                                 deleteBooking={(data) => this.deleteBooking(data)}
                                                 {...props}/>}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.loginReducer.data,
        bookings: state.bookingReducer.bookings,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBookings: (value) => dispatch(loadBooking(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking)