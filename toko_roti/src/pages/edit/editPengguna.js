import React, { Component } from 'react';
import { Sidebar, MenuProfile, Topnav } from '../../component'
import { Link } from 'react-router-dom'
import UbahPengguna from '../content/ubahPengguna.js'
import { connect } from 'react-redux';

class EditPengguna extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    validation = () => {
        if (this.props.checkLogin === true && this.props.userLogin.role === "Umum") {
            this.props.history.push("/pelanggan");
        } else if (this.props.checkLogin === true && this.props.userLogin.role === "Member") {
            this.props.history.push("/pelanggan");
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
                                <div className="navbar nav_title" style={{ border: 0 }}>
                                    <Link to="/pelanggan" className="site_title"><i className="fa fa-home" /> <span>Urban Bakery</span></Link>
                                </div>
                                <div className="clearfix" />
                                <MenuProfile />
                                <br />
                                <Sidebar />
                            </div>
                        </div>
                        <Topnav />
                        <div className="right_col" role="main">
                            <UbahPengguna {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPengguna);