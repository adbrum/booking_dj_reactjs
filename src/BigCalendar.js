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

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
                title: '',
                msg: '',
                start: '',
                end: ''
        }

        this.onSlotChange = this.onSlotChange.bind(this)
        this.onEventClick = this.onEventClick.bind(this)
    }

    onSlotChange = (slotInfo) => {
        let startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        let endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        let title = 'Teste'
        console.log('startTimetartDate', startDate)
        console.log('endTimendDate', endDate)

        this.setState({
                start: startDate,
                end: endDate
            })

        this.setState({showModal: true})
    }

    onEventClick = (event) => {
        //console.log(event) //Shows the event details provided while booking

        // this.props.editEvent(event)
        this.setState({showModal: true})
    }

    addBooking = (data) => {
        console.log('DATA XXXXXXX: ', data)
        let data1 = {
            title: data.title,
            msg: data.msg,
            start: data.start,
            end: data.end
        }


        this.setState({
            events: data[0],
            })
        this.props.addBooking(data)

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
                                                addBooking={(data) => {
                                                    this.addBooking(data)
                                                }}
                                                {...props}/>}/>
                }

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

            </React.Fragment>
        )


    }
}

export default Event