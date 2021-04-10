import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {   }
    }


    render() {
        const {onClick, className, title, dataToggle, dataTarget, disabled, style} = this.props
        return (
            <>
                <button onClick={onClick} className={className} title={title} data-toggle={dataToggle} data-target={dataTarget} disabled={disabled} style={style} >
                    {this.props.children}
                </button>
            </>
        );
    }
}

export default Button;