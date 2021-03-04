import React, { Component } from 'react';
import profilepic from '../../assets/user.png'
import { Link } from "react-router-dom";

class Topnav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="top_nav">
                <div className="nav_menu">
                    <div className="nav toggle">
                        <Link id="menu_toggle"><i className="fa fa-bars" /></Link>
                    </div>
                    <nav className="nav navbar-nav">
                        <ul className=" navbar-right">
                            <li className="nav-item dropdown open" style={{ paddingLeft: 15 }}>
                                <Link className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                                    <img src={profilepic} alt="..." />Admin
                                </Link>
                                <div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                                    <Link to="" className="dropdown-item"> Ubah Password </Link>
                                    <Link to="/login" className="dropdown-item"><i className="fa fa-sign-out pull-right" /> Log Out</Link>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
 
export default Topnav;