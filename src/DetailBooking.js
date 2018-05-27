import React, {Component} from 'react'
import {Link, Redirect, Route} from 'react-router-dom'
import Success from "./Success";
import axios from 'axios'

class DetailBooking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            details: [],
            editBooking: '',
            show: true,
            redirect: false,
            typeRedirect: ''
        }

        this.toggleDiv = this.toggleDiv.bind(this)
        this.removeBooking = this.removeBooking.bind(this)
        this.editBooking = this.editBooking.bind(this)
        this.cancelBooking = this.cancelBooking.bind(this)
    }

    componentDidMount() {
        axios.get(`/booking/${this.props.match.params.idBooking}`)
            .then(res => {
                const details = res.data
                //console.log(details)
                this.setState({details: details, show: true})
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    removeBooking = (index) => {
        axios.delete(`/booking/delete/` + index)
            .then(res => {
                //console.log(res);
                console.log(res.data);
                this.setState({
                    redirect: 'success',
                    typeRedirect: 'exclude'
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateBooking = (event, id) => {
        event.preventDefault()

        if (this.refs.name.value !== '') {
            this.setState({
                details: null
            })

            let author = 1
            let name = this.refs.name.value
            let date = this.refs.date.value
            let description = this.refs.description.value

            let detail = {
                author,
                name,
                date,
                description
            }

            let details = this.state.details
            details.push(detail)
            this.setState({
                details: details
            })

            axios.post(`/booking/${id}`, detail)
                .then(res => {
                    //console.log(res);
                    //console.log(res.data);
                    this.setState({
                        redirect: 'success',
                        editBooking: '',
                        details: res.data,
                        typeRedirect: 'update'
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    editBooking = (id) => {
        this.setState({editBooking: id})
    }

    toggleDiv = () => {
        const {show} = this.state
        this.setState({show: show})
    }

    cancelBooking = (event) => {
        event.preventDefault()
        this.setState({redirect: 'cancel'})
    }

    render() {
        if (this.state.redirect === 'success'){
            return <Route render={(props)=> <Success exclude={this.state.exclude} data={this.state.details} {...props}/>}/>
        }
        if (this.state.redirect === 'cancel'){
            return <Redirect to={`/bookings`} />
        }
        return (
            <div>
                {this.state.show &&
                <div>
                    <Link to={`/bookings`} onClick={this.props.toggleDiv} className="btn btn-primary">Voltar</Link>
                    <hr/>
                    {this.state.details.map((item, index) => {
                        return (
                            <div key={index}>
                                {this.state.editBooking !== item.id &&
                                <div>
                                    <p>Nome: {item.name}</p>
                                    <p>Data: {item.date}</p>
                                    <p>Descrição: {item.description}</p>
                                    <button onClick={() => this.removeBooking(item.id)}
                                            className="btn btn-warning">Remover
                                    </button>
                                    {`  `}
                                    <button onClick={() => this.editBooking(item.id)}
                                            className="btn btn-primary">Editar
                                    </button>
                                </div>
                                }
                                {this.state.editBooking === item.id &&
                                <div>
                                    <form ref="form_bookings" className="form">
                                        <div className="col-xs-6 form-group">
                                            <label htmlFor="">Nome</label>
                                            <input type="text" defaultValue={item.name} ref="name"
                                                   placeholder="Nome para a marcação" className="form-control"/>

                                            <label htmlFor="">Data</label>
                                            <input type="text" defaultValue={item.date} ref="date"
                                                   placeholder="Data da marcação" className="form-control"/>

                                            <label htmlFor="">Descrição</label>
                                            <input type="text" defaultValue={item.description} ref="description"
                                                   placeholder="Descrição" className="form-control"/>
                                            <hr/>
                                            <button type="submit" onClick={(e) => this.updateBooking(e, item.id)}
                                                    className="btn btn-success">Salvar
                                            </button>
                                            {' '}
                                            <button type="submit" onClick={(e) => this.cancelBooking(e)}
                                                    className="btn btn-primary">Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                }
                            </div>
                        )
                    })}
                </div>
                }
            </div>
        )
    }
}


export default DetailBooking


