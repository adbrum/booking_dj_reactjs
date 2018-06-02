import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import axios from 'axios'
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
        // axios.get(`/bookings/${this.props.user}`)
        axios.get(`/bookings/today/1`)
            .then(res => {
                const bookings = res.data
                // console.log('TODAY: ', bookings)
                this.setState({bookings: bookings})
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    datesHandle = (event) => {
        event.preventDefault()

        let start_date = this.refs.start_date.value
        let end_date = this.refs.end_date.value

        axios({
            method: "post",
            url: "/bookings/today/1",
            data: {
                start_date: start_date,
                end_date: end_date,
            },
        })
            .then(res => {
                console.log('RESPONSE: ', res.data)
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
            <div>
                <div className="col-xs-8 form-group">
                        <label htmlFor="">Data inicio</label>
                        <input type="text" ref="start_date" placeholder="Inicio" className="form-control"/>

                        <label htmlFor="">Data fim</label>
                        <input type="text" ref="end_date" placeholder="Fim" className="form-control"/>
                    <hr/>
                        <button type="submit" onClick={(e) => this.datesHandle(e)} className="btn btn-primary">Enviar
                        </button>
                    </div>
                <hr/>
                {this.state.show &&
                <div className="col-xs-6 form-group">
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

export default Bookings