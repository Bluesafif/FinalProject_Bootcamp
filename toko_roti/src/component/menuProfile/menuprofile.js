import React, { Component } from 'react';
import profilepic from '../../assets/user.png'
import { connect } from 'react-redux';

class MenuProfile extends Component {
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

    render() { 
        return (
            <div className="profile clearfix">
                <div className="profile_pic">
                    <img src={profilepic} alt="..." className="img-circle profile_img" />
                </div>
                <div className="profile_info">
                    <span>Selamat Datang,</span>
                    <h2>{this.state.userProfil.namaLengkap}</h2>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuProfile);