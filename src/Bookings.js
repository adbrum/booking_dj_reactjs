import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import api from './api'
import DetailBooking from "./DetailBooking";

class Bookings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bookings: [],
            detail: [],
            show: true
        }

        this.toggleDiv = this.toggleDiv.bind(this)
    }

    componentDidMount() {
        // axios.get(`http://localhost:3001/bookings/?author=${this.props.data.id}`)
        api.get(`/bookings/1`)
            .then(res => {
                const bookings = res.data
                // console.log(bookings)
                this.setState({bookings: bookings})
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    toggleDiv = () => {
        const {show} = this.state
        //console.log(this.state.show)
        this.setState({show: !show})
    }

    render() {
        return (
            <div>
                {this.state.show &&
                <div>
                    {this.state.bookings.map((booking, index) => {
                        return (
                            <div key={index}>
                                <ul className="list-group">
                                    <li className="list-group-item">Nome: {booking.name}</li>
                                    <li className="list-group-item">Data: {booking.date}</li>
                                    <li className="list-group-item">Descrição: {booking.description}</li>
                                    <li className="list-group-item">
                                        <Link onClick={this.toggleDiv} to={`/bookings/booking/${booking.id}`}
                                              className="btn btn-warning">Detalhe</Link>
                                    </li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
                }

                <Route exact path={`/bookings/booking/:idBooking`}
                       render={(props) => <DetailBooking toggleDiv={this.toggleDiv} {...props}/>}/>
            </div>
        )
    }
}

export default Bookings