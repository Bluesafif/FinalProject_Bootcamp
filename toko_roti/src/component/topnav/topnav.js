import React, { Component } from 'react';
import profilepic from '../../assets/user.png'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Topnav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfil: {}
        }
    }

    getProfil = () => {
        fetch(`http://localhost:8080/roti/master/profil/?idUser=${encodeURIComponent(this.props.userLogin.idUser)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userProfil: json
                });
                if (typeof json.errorMessage !== 'undefined') {

                }
            })
            .catch((e) => {
                console.log(e);

            });
    };

    componentDidMount() {
        this.getProfil()
    }

    doLogout = () => {
        if (window.confirm("Apakah anda yakin ingin keluar?")) {
            this.props.logout()
            window.alert("Anda telah berhasil keluar!")
        }
    }

    render() {
        return (
            <div className="top_nav">
                <div className="nav_menu">
                    <div className="nav navbar-nav">
                        <ul className=" navbar-right">
                            <li className="nav-item dropdown open" style={{ paddingLeft: 15 }}>
                                <Link className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                                    <img src={profilepic} alt="..." />{this.state.userProfil.namaLengkap}
                                </Link>
                                <div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                                    <Link to="/ubah-password" className="dropdown-item"> Ubah Password </Link>
                                    <Link to="/login" className="dropdown-item"><i className="fa fa-sign-out pull-right" /> <div onClick={() => this.doLogout()}> Keluar</div></Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userLogin: state.AReducer.dataUser
})

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({ type: "LOGOUT_SUCCESS" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topnav);