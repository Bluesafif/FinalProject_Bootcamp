import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SidebarPel extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
        <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
            <div className="menu_section">
                <ul className="nav side-menu">
                    <li><Link to="/pelanggan"><i className="fa fa-tachometer" /> Dashboard </Link></li>
                    <li><Link><i className="fa fa-tachometer" /> Roti </Link></li>
                    <li><Link><i className="fa fa-shopping-cart" /> Keranjang </Link></li>
                    <li><Link to="/data-pelanggan"><i className="fa fa-user" /> Data Pelanggan </Link></li>
                </ul>
            </div>
        </div>
      );
    }
}
 
export default SidebarPel;