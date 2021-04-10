import React, { Component } from 'react';

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {   }
    }

    render() {
        const {value, key} = this.props
        return (
            <>
                <option value={value} key={key}>
                    {this.props.children}
                </option>
            </>

        );
    }
}

export default Option;