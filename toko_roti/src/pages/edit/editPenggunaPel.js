import React, { Component } from 'react';
import { SidebarPel, MenuProfile, Topnav } from '../../component'
import { Link } from 'react-router-dom'
import UbahPenggunaPel from '../content/ubahPenggunaPel.js'

class EditPenggunaPel extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <body className="nav-md">
                <div className="container body">
                    <div className="main_container">
                        <div className="col-md-3 left_col">
                            <div className="left_col scroll-view">
                                <div className="navbar nav_title" style={{ border: 0 }}>
                                    <Link to="/pelanggan" className="site_title"><i className="fa fa-home" /> <span>Urban Bakery</span></Link>
                                </div>
                                <div className="clearfix" />
                                <MenuProfile />
                                <br />
                                <SidebarPel />
                            </div>
                        </div>
                        <Topnav />
                        <div className="right_col" role="main">
                            <UbahPenggunaPel {...this.props} />
                        </div>
                    </div>
                </div>
            </body>
        );
    }
}
 
export default EditPenggunaPel;