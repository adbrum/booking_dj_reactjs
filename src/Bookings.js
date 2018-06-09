import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import axios from 'axios'
import DetailBooking from "./DetailBooking";
import DatePicker from 'react-datepicker';
import moment from 'moment';


import 'react-datepicker/dist/react-datepicker.css';
import {connect} from "react-redux";

class Bookings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bookings: [],
            detail: [],
            show: true,
            startDate: moment(),
            endDate: moment()

        }

        this.toggleDiv = this.toggleDiv.bind(this)
    }

    componentDidMount() {
        axios.get(`/bookings/today/${this.props.data.id}`)
            .then(res => {
                const bookings = res.data
                this.setState({bookings: bookings})
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    handleChangeStart = (date) => {
        this.setState({
            startDate: date
        })
    }

    handleChangeEnd = (date) => {
        this.setState({
            endDate: date
        })
    }

    datesHandle = (event) => {
        event.preventDefault()

        // let start_date = this.refs.start_date.value
        // let end_date = this.refs.end_date.value
        let start_date = this.state.startDate
        let end_date = this.state.endDate

        axios({
            method: "post",
            url: `/bookings/today/${this.props.data.id}`,
            data: {
                start_date: start_date,
                end_date: end_date,
            },
        })
            .then(res => {
                // console.log('RESPONSE: ', res.data)
                const bookings = res.data
                // console.log(bookings)
                this.setState({bookings: bookings})
            })
            .catch(err => {
                console.log('ERRO: ', err)
            })
    }

    toggleDiv = () => {
        const {show} = this.state
        //console.log(this.state.show)
        this.setState({show: !show})
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-4 form-group">
                    <label htmlFor="">Data inicio</label>
                    <DatePicker
                        defaultText="Data inicio"
                        todayButton={"Hoje"}
                        dateFormat="DD/MM/YYYY"
                        selected={this.state.startDate}
                        onChange={this.handleChangeStart}
                        className="form-control"
                    />

                    <label htmlFor="">Data fim</label>
                    <DatePicker
                        defaultText="Data fim"
                        todayButton={"Hoje"}
                        dateFormat="DD/MM/YYYY"
                        selected={this.state.endDate}
                        onChange={this.handleChangeEnd}
                        className="form-control"
                    />
                    <br/>
                    <button type="submit" onClick={(e) => this.datesHandle(e)} className="btn btn-primary">Enviar
                    </button>
                </div>
                <hr/>
                {this.state.show &&
                <div className="col-md-8 form-group">
                    {this.state.bookings.map((booking, index) => {
                        return (
                            <div key={index}>
                                <ul className="list-group">
                                    <li className="list-group-item">Nome: {booking.title}</li>
                                    <li className="list-group-item">Data: {booking.start}</li>
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

const mapStateToProps = (state) => {
    return {
        data: state.loginReducer.data
    }
}

export default connect(mapStateToProps)(Bookings)
