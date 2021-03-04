import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="sidebar-footer hidden-small">
                <Link data-toggle="tooltip" data-placement="top" title="" data-original-title>
                    <span className="glyphicon glyphicon-cog" aria-hidden="true" />
                </Link>
            </div>
        );
    }
}
 
export default MenuFooter;