import React, { Component } from 'react';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {   }
    }

    render() {
        const {name, onChange, value, type, required, className} = this.props
        return (
            <>    
                <select name={name} onChange={onChange} value={value} className={className} typeof={type} required={required}>
                    {this.props.children}
                </select>
            </>

        );
    }
}

export default Select;