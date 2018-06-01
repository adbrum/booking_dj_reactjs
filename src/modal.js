import React, {Component} from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            title: '',
            msg: '',
            start: '',
            end: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            msg: nextProps.msg,
            start: this.props.start,
            end: this.props.end
        });
    }

    titleHandler(e) {
        this.setState({ title: e.target.value });
    }

    msgHandler(e) {
        this.setState({ msg: e.target.value });
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        </div>
                        <div className="modal-footer form-group">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;