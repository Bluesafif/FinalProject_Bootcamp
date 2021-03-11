import React, { Component } from 'react';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {   }
    }

    render() {
        const {name, onChange, value, type, required} = this.props
        return (
            <>    
                <select name={name} onChange={onChange} value={value} className="custom-select" typeof={type} required={required}>
                    {this.props.children}
                </select>
            </>

        );
    }
}

export default Select;