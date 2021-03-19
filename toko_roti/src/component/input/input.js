import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { type, className, name, onChange, placeholder, value, disabled, required, id, defaultValue, min, max } = this.props
        return ( 
            <>
                <input type={type} className={className} min={min} name={name} onChange={onChange} placeholder={placeholder} value={value} disabled={disabled} required={required} id={id} defaultValue={defaultValue} max={max} />
            </>
        );
    }
}
 
export default Input;