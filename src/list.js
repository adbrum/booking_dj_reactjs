import React, {Component} from 'react';
import Modal from './modal.js';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requiredItem: 0,
            brochure: [
                {
                    title: this.props.title,
                    msg: this.props.msg,
                }
            ]
        }

        this.replaceModalItem = this.replaceModalItem.bind(this);
        this.saveModalDetails = this.saveModalDetails.bind(this);
        this.editModalDetails = this.editModalDetails.bind(this);
    }

    replaceModalItem(index) {
        this.setState({
            requiredItem: index
        });
    }

    saveModalDetails(item) {
        const requiredItem = this.state.requiredItem;
        let tempbrochure = this.state.brochure;
        tempbrochure[requiredItem] = item;
        this.setState({brochure: tempbrochure});
        this.props.addBooking(this.state.brochure)
    }

    editModalDetails(item) {
        const requiredItem = this.state.requiredItem;
        let tempbrochure = this.state.brochure;
        tempbrochure[requiredItem] = item;
        this.setState({brochure: tempbrochure});
        this.props.editBooking(this.state.brochure)
    }

    deleteItem(index) {
        let tempBrochure = this.state.brochure;
        tempBrochure.splice(index, 1);
        this.setState({brochure: tempBrochure});
        this.props.deleteBooking({'id': this.props.id})
    }

    render() {
        const brochure = this.state.brochure.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.title}</td>
                    <td>{" "} - {" "}</td>
                    <td>{item.msg}</td>
                    <td>
                        {this.props.type === 'save' &&
                        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                                onClick={() => this.replaceModalItem(index)}>Novo
                        </button>
                        }
                        {this.props.type === 'edit' &&
                        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                                onClick={() => this.replaceModalItem(index)}>editar
                        </button>
                        }
                        {" "}
                        <button className="btn btn-danger" onClick={() => this.deleteItem(index)}>remove</button>
                        {" "}
                    </td>
                </tr>
            )
        });

        const requiredItem = this.state.requiredItem;
        let modalData = this.state.brochure[requiredItem];
        return (
            <div>
                <table className="table table-striped">
                    <tbody>
                    {brochure}
                    </tbody>
                </table>
                {this.props.type === 'save' &&
                <Modal
                    title={modalData.title}
                    msg={modalData.msg}
                    start={this.props.start}
                    end={this.props.end}
                    status={this.props.status}
                    saveModalDetails={this.saveModalDetails}
                />}
                {this.props.type === 'edit' &&
                <Modal
                    id={this.props.id}
                    title={modalData.title}
                    msg={modalData.msg}
                    start={this.props.start}
                    end={this.props.end}
                    status={this.props.status}
                    hex_color={this.props.hex_color}
                    saveModalDetails={this.editModalDetails}
                />}
            </div>
        );
    }
}

export default List;