import React, { Component } from 'react';

class Textarea extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { name, onChange, value } = this.props
        return ( 
            <>
                <textarea name={name} className="form-control" value={value} onChange={onChange}/>
            </>
        );
    }
}
 
export default Textarea;