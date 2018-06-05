import React from 'react'
import reactCSS from 'reactcss'
import {SketchPicker} from 'react-color'

class ColorPicker extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        displayColorPicker: false,
        color: '#3174ad'
        // color: {
        //     r: '49',
        //     g: '116',
        //     b: '173',
        //     a: '100',
        // },
    };
    handleChange = (color) => {
        // console.log('COLORPICKER: ', color.hex)
        this.props.action(color)
        this.setState({color: color.hex})
    };

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false})
    };

    componentDidMount() {
        this.setState({color: this.props.value})
        this.props.action(this.state.color)
    }

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '5px',
                    text: 'Cor',
                    // background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
                    background: `${this.state.color}`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color}/>
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose}/>
                    <SketchPicker color={this.state.color} onChange={this.handleChange}/>
                </div> : null}

            </div>
        )
    }
}

export default ColorPicker