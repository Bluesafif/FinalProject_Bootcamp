import React, { Component } from 'react';

class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {   }
    }


    render() {
        const {children, className} = this.props
        return (
            <>
                <label className={className}>
                    {children}
                </label>
            </>
        );
    }
}

export default Label;