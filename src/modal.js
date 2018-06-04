import React, {Component} from 'react';
import ColorPicker from "./ColorPicker";

class Modal extends Component {
    handleHexColor = (color) => {
        // console.log('COLOR: ', color)
        this.setState({hex_color: color.hex})
    }

    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            id: '',
            title: '',
            msg: '',
            start: '',
            end: '',
            status: '',
            hex_color: ''
        }

        this.handleHexColor = this.handleHexColor.bind()
    }

    titleHandler(e) {
        this.setState({title: e.target.value});
    }

    msgHandler(e) {
        this.setState({msg: e.target.value});
    }

    statusHandler(e) {
        this.setState({
            status: e.target.checked,
            hex_color: '',
        })

        if (e.target.checked) {
            this.setState({
                hex_color: this.state.hex_color,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: this.props.id,
            title: nextProps.title,
            msg: nextProps.msg,
            start: this.props.start,
            end: this.props.end,
            status: this.props.status,
            hex_color: this.props.hex_color
        });
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Dados da marcação</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body form-group">
                            <p><span className="modal-lable">Título</span><input className="form-control"
                                                                                 value={this.state.title}
                                                                                 onChange={(e) => this.titleHandler(e)}/>
                            </p>
                            <p><span className="modal-lable">Descrição</span><textarea className="form-control"
                                                                                       value={this.state.msg}
                                                                                       onChange={(e) => this.msgHandler(e)}/>
                            </p>
                            <p><span className="modal-lable">Presente</span>
                                <input className="checkbox" ref="status" type="checkbox" checked={this.state.status}
                                       onChange={(e) => this.statusHandler(e)}/>
                            </p>
                            <ColorPicker action={(e) => this.handleHexColor(e)} value={this.props.hex_color}/>
                        </div>
                        <div className="modal-footer form-group">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => {
                                this.handleSave()
                            }}>Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;