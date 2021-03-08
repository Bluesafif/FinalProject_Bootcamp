import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {   }
    }


    render() {
        const {onClick, className, title} = this.props
        return (
            <>
                <button onClick={onClick} className={className} title={title} >
                    {this.props.children}
                </button>
            </>
        );
    }
}

export default Button;