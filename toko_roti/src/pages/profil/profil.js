import React, { Component } from 'react';
import { SidebarPel, Topnav } from '../../component'
import { Link } from 'react-router-dom'
import DataPelanggan from '../content/dataPelanggan'
import { connect } from 'react-redux';

class Profil extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    validation = () => {
        if (this.props.checkLogin === true && this.props.userLogin.passwordVal === true) {
            this.props.history.push("/ubah-password")
        } else if (this.props.checkLogin === true && this.props.userLogin.role === "Admin") {
            this.props.history.push("/admin")
        } else if (this.props.checkLogin === false) {
            this.props.history.push("/")
        }
    }
    
    render() {
        this.validation()
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
                                <br />
                                <SidebarPel />
                            </div>
                        </div>
                        <Topnav />
                        <div className="right_col" role="main">
                            <DataPelanggan />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil);