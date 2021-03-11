import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {   }
    }


    render() {
        const {onClick, className, title, dataToggle, dataTarget} = this.props
        return (
            <>
                <button onClick={onClick} className={className} title={title} data-toggle={dataToggle} data-target={dataTarget} >
                    {this.props.children}
                </button>
            </>
        );
    }
}

export default Button;