import React, { Component } from 'react';
import { Sidebar, SidebarPel, MenuProfile, Topnav } from '../../component'
import { Link } from 'react-router-dom'
import UbahPass from '../content/ubahPass.js'
import { connect } from 'react-redux';

class UbahPassword extends Component {
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
                            <div className="navbar nav_title" style={{border: 0}}>
                                <Link to="/pelanggan" className="site_title"><i className="fa fa-home" /> <span>Urban Bakery</span></Link>
                            </div>
                            <div className="clearfix" />
                                <MenuProfile />
                                <br />
                                {
                                    this.props.userLogin.role === "Admin"
                                    ? <Sidebar />
                                    : <SidebarPel />
                                }
                            </div>
                        </div>
                        <Topnav />
                        <div className="right_col" role="main">
                            <UbahPass />
                        </div>
                    </div>
                </div>
            </body>
        );
    }
}
 
const mapStateToProps = state => ({
    checkLogin: state.AReducer.isLogin,
    userLogin: state.AReducer.dataUser,
    users: state.UReducer.users
})

const mapDispatchToProps = dispatch => {
    return {
      submitLogin: (data) => dispatch({type: "LOGIN_SUCCESS", payload:data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UbahPassword);