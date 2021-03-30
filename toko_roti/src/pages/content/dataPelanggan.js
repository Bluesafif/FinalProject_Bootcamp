import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import profil from '../../assets/user.png'
import { connect } from 'react-redux';

class DataPelanggan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfil : {}
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
      })
      .catch((e) => {
          console.log(e);
          
      });
      };

      componentDidMount(){
          this.getProfil()
      }

    render() {
        return (
            <div className>
                <div className="page-title">
                    <div className="title_left">
                        <h3>Data Pelanggan</h3>
                    </div>
                </div>
                <div className="clearfix" />
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Profil</h2>&nbsp;
                                <Link to={"/pelanggan-editpelanggan/"+this.state.userProfil.idUser} className="btn btn-warning btn-sm"><i className="fa fa-pencil-square-o" /> Edit Profil</Link>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <div className="row" align="center">
                                    <div className="col-md-12 col-sm-10 col-xs-12">
                                        <div className="pricing">
                                            <div className="title">
                                                <center>
                                                    <img src={profil} alt="..." className="img-circle img-responsive" style={{ width: 100, height: 80 }} />
                                                </center>
                                            </div>
                                            <div className="x_content">
                                                <div className>
                                                    <div className="pricing_features">
                                                        <ul className="list-unstyled">
                                                            <center>
                                                                <div className="">
                                                                    <strong>Nama Lengkap</strong>
                                                                    <p>{this.state.userProfil.namaLengkap}</p>
                                                                </div>
                                                                <div className="">
                                                                    <strong>Nama Pengguna</strong>
                                                                    <p>{this.state.userProfil.username}</p>
                                                                </div>
                                                                <div className="">
                                                                    <strong>Alamat</strong>
                                                                    <p>{this.state.userProfil.alamat}</p>
                                                                </div>
                                                                <div className="">
                                                                    <strong>Nomor Telepon</strong>
                                                                    <p>{this.state.userProfil.nomorTelepon}</p>
                                                                </div>
                                                                <div className="">
                                                                    <strong>Email</strong>
                                                                    <p>{this.state.userProfil.email}</p>
                                                                </div>
                                                                <div className="">
                                                                    <strong>Status</strong>
                                                                    <p>{this.state.userProfil.role}</p>
                                                                </div>
                                                            </center>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DataPelanggan);