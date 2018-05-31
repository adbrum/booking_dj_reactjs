import React, {Component} from 'react'
// import BigCalendar from 'react-big-calendar';
import BigCalendar from 'react-big-calendar-like-google'
import moment from 'moment'
import 'moment/locale/pt'
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'
import events from './events'
import List from "./list";

// Scripts
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from "react-router-dom";
import axios from "axios/index";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            title: '',
            msg: '',
            start: '',
            end: '',
            type: 'save'
        }

        this.onSlotChange = this.onSlotChange.bind(this)
        this.onEventClick = this.onEventClick.bind(this)
        this.addBooking = this.addBooking.bind(this)
        this.editBooking = this.editBooking.bind(this)
    }

    onSlotChange = (slotInfo) => {
        let startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        let endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        // console.log('startTimetartDate', startDate)
        // console.log('endTimendDate', endDate)

        this.setState({
            start: startDate,
            end: endDate
        })

        this.setState({showModal: true})
    }

    onEventClick = (event) => {
        console.log('EVENT: ', event['id'])
        axios.get(`/booking/${event.id}`)
            .then(res => {
                const booking = res.data
                console.log('EVENTO: ', booking)
                // this.setState({bookings: bookings})
            })
            .catch(err => {
                console.log(err.response)
            })

        this.setState({
            type: 'edit',
            title: event.title,
            msg: 'Teste teste',
            showModal: true
        })
    }

    addBooking = (data) => {
        this.setState({type: 'save'})
        this.props.addBooking(data)
        this.setState({showModal: false})
    }

    editBooking = (data) => {
        this.setState({type: 'edit'})
        this.props.editBooking(data)
        this.setState({showModal: false})
    }

    render() {
        this.props.data.map(item => {
            item.start = new Date(item.start),
                item.end = new Date(item.end)
        })

        return (
            <React.Fragment>
                {this.state.showModal &&
                <Route render={(props) => <List events={this.state.events}
                                                start={this.state.start}
                                                end={this.state.end}
                                                type={this.state.type}
                                                title={this.state.title}
                                                msg={this.state.msg}
                                                addBooking={(data) => {
                                                    this.addBooking(data)
                                                }}
                                                editBooking={(data) => {
                                                    this.editBooking(data)
                                                }}
                                                {...props}/>}/>
                }

                {!this.state.showModal &&
                <div>
                    <h3 className="callout">
                        Click an event to see more info, or drag the mouse over the calendar to
                        select a date/time range.
                    </h3>
                    <BigCalendar
                        selectable
                        resizable
                        onEventResize={this.resizeEvent}
                        events={this.props.data}
                        defaultView="week"
                        scrollToTime={new Date(2018, 1, 1, 6)}
                        defaultDate={new Date()}
                        onSelectEvent={event => this.onEventClick(event)}
                        onSelectSlot={(slotInfo) => this.onSlotChange(slotInfo)
                        }
                    />
                </div>
                }
            </React.Fragment>
        )
    }
}

export default Event