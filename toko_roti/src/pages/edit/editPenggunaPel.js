import React, { Component } from 'react';
import { SidebarPel, MenuProfile, Topnav } from '../../component'
import { Link } from 'react-router-dom'
import UbahPenggunaPel from '../content/ubahPenggunaPel.js'
import { connect } from 'react-redux';

class EditPenggunaPel extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    validation = () => {
        if (this.props.checkLogin === true && this.props.userLogin.role === "Admin") {
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
 
const mapStateToProps = state => ({
    checkLogin: state.AReducer.isLogin,
    userLogin: state.AReducer.dataUser,
    users: state.UReducer.users
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPenggunaPel);