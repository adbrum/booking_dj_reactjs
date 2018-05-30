import React, {Component} from 'react'
// import BigCalendar from 'react-big-calendar';
import BigCalendar from 'react-big-calendar-like-google'
import moment from 'moment'
import 'moment/locale/pt'
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'
import events from './events'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class Event extends Component {
    constructor(props) {
        super(props);


        this.onSlotChange = this.onSlotChange.bind(this)
    }

    onSlotChange = (slotInfo) => {
        let startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        let endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        console.log('startTimetartDate', startDate)
        console.log('endTimendDate', endDate)
    }

    onEventClick = (event) => {
        console.log(event) //Shows the event details provided while booking
    }

    render() {
        this.props.data.map(item => {
            item.start = new Date(item.start),
                item.end = new Date(item.end)
        })
        return (
            <React.Fragment>
                {JSON.stringify(this.props.data)}
                <h3 className="callout">
                    Click an event to see more info, or drag the mouse over the calendar to
                    select a date/time range.
                </h3>
                <BigCalendar
                    selectable
                    events={this.props.data}
                    defaultView="week"
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    onSelectEvent={event => this.onEventClick(event)}
                    onSelectSlot={(slotInfo) => this.onSlotChange(slotInfo)

                        // alert(
                        //     `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                        //     `\nend: ${slotInfo.end.toLocaleString()}` +
                        //     `\naction: ${slotInfo.action}`
                        // )
                    }
                />
            </React.Fragment>
        )
    }
}

export default Event