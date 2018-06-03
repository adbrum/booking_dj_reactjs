import React, {Component} from 'react'
// import BigCalendar from 'react-big-calendar';
import BigCalendar from 'react-big-calendar-like-google'
import moment from 'moment'
import 'moment/locale/pt'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'
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
            id: '',
            title: '',
            msg: '',
            start: '',
            end: '',
            type: 'save',
            status: ''
        }

        this.onSlotChange = this.onSlotChange.bind(this)
        this.onEventClick = this.onEventClick.bind(this)
        this.addBooking = this.addBooking.bind(this)
        this.editBooking = this.editBooking.bind(this)
        this.eventStyleGetter = this.eventStyleGetter.bind(this)
    }

    onSlotChange = (slotInfo) => {
        let startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        let endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");

        this.setState({
            type: 'save',
            title: '',
            msg: '',
            start: startDate,
            end: endDate,
            showModal: true
        })
    }

    onEventClick = (event) => {
        this.setState({
            id: event.id,
            type: 'edit',
            title: event.title,
            msg: event.description,
            status: event.status,
            showModal: true
        })
    }

    addBooking = (data) => {
        this.setState({type: 'save'})
        this.props.addBooking(data)
        this.setState({showModal: false})
    }

    editBooking = (data) => {
        this.props.editBooking(data)
        this.setState({
            type: 'edit',
            showModal: false
        })
    }

    deleteBooking = (data) => {
        this.props.deleteBooking(data)
        this.setState({
            type: 'edit',
            showModal: false
        })
    }

    eventStyleGetter = (event, start, end, isSelected) => {
        if (event.hex_color) {
            let backgroundColor = '#' + event.hex_color;
            let style = {
                backgroundColor: backgroundColor,
                borderRadius: '5px',
                opacity: 0.8,
                color: '#fff',
                border: '1px',
                display: 'block'
            };
            return {
                style: style
            };

        }
        let style = {}
        return {
            style: style
        };

    }

    render() {
        this.props.data.map(item => {
            item.start = new Date(item.start)
            item.end = new Date(item.end)
        })

        return (
            <React.Fragment>
                {this.state.showModal &&
                <Route render={(props) => <List events={this.state.events}
                                                start={this.state.start}
                                                end={this.state.end}
                                                type={this.state.type}
                                                id={this.state.id}
                                                title={this.state.title}
                                                msg={this.state.msg}
                                                status={this.state.status}
                                                addBooking={(data) => {
                                                    this.addBooking(data)
                                                }}
                                                editBooking={(data) => {
                                                    this.editBooking(data)
                                                }}
                                                deleteBooking={(data) => {
                                                    this.deleteBooking(data)
                                                }}
                                                {...props}/>}/>
                }

                {!this.state.showModal &&
                <div>
                    <div active="plan" title="Planning">
                        <div className="content-app fixed-header">
                            <div className="app-body">
                                <div className="box">
                                    <BigCalendar
                                        selectable
                                        resizable
                                        popup
                                        popupOffset={{x: 30, y: 20}}
                                        onEventResize={this.resizeEvent}
                                        events={this.props.data}
                                        defaultView="week"
                                        scrollToTime={new Date(2018, 1, 1, 10, 10, 0)}
                                        defaultDate={new Date()}
                                        onSelectEvent={event => this.onEventClick(event)}
                                        onSelectSlot={(slotInfo) => this.onSlotChange(slotInfo)}
                                        eventPropGetter={events => this.eventStyleGetter(events)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                }
            </React.Fragment>
        )
    }
}

export default Event