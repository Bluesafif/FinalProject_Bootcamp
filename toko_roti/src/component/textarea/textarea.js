import React, { Component } from 'react';

class Textarea extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { name, className, onChange, value, required } = this.props
        return ( 
            <>
                <textarea name={name} className={className} value={value} onChange={onChange} required={required} />
            </>
        );
    }
}
 
export default Textarea;