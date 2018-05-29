import React, {Component} from 'react';
// import BigCalendar from 'react-big-calendar';
import BigCalendar from 'react-big-calendar-like-google';
import moment from 'moment';
import 'moment/locale/pt';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css';
import events from './events'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Event extends Component {
    constructor() {
        super();
        this.state = {
            events: [],
        };
    }

    render() {
        return (
            <React.Fragment>
                <h3 className="callout">
                    Click an event to see more info, or drag the mouse over the calendar to
                    select a date/time range.
                </h3>
                <BigCalendar
                    selectable
                    events={events}
                    defaultView="week"
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date(2015, 3, 12)}
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={slotInfo =>
                        alert(
                            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                            `\nend: ${slotInfo.end.toLocaleString()}` +
                            `\naction: ${slotInfo.action}`
                        )
                    }
                />
            </React.Fragment>
        );
    }
}

export default Event