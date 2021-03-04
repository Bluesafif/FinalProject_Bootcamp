import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
        <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
            <div className="menu_section">
                <ul className="nav side-menu">
                    <li><Link to="/admin"><i className="fa fa-tachometer" /> Dashboard </Link></li>
                    <li><Link to="/admin-roti"><i className="fa fa-tachometer" /> Roti </Link></li>
                    <li><Link to="/admin-laporan"><i className="fa fa-print" /> Laporan </Link></li>
                    <li><Link><i className="fa fa-user" /> Pengguna </Link></li>
                </ul>
            </div>
        </div>
      );
    }
}
 
export default Sidebar;