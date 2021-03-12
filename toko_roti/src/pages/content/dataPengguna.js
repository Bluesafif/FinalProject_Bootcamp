import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Input, Label } from '../../component';

class DataPengguna extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pengguna: [],
            usersView: {}
        }
    }

    fetchPengguna = () => {
        fetch(`http://localhost:8080/roti/master/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    pengguna: json,
                });
            })
            .catch(() => {
                alert("failed fetching data");
            });
    };

    view = (index) => {
        const userView = this.state.pengguna[index]
        this.setState({
            usersView: userView
        })
    }
    
    resetStatus = (idUser) =>{
        fetch(`http://localhost:8080/roti/master/user/status/`+idUser, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((response) => response.json())
        .then((json) => {
            if (typeof json.errorMessage !== "undefined") {
                alert(json.errorMessage);
            } else if (typeof json.errorMessage === "undefined") {
                alert(
                    json.errorMessage
                );
            }
            this.fetchPengguna()
        })
        .catch((e) => {
            window.alert(e);
        });
    }

    resetPassword = (idUser) =>{
        fetch(`http://localhost:8080/roti/master/user/password/`+idUser, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((response) => response.json())
        .then((json) => {
            if (typeof json.errorMessage !== "undefined") {
                alert(json.errorMessage);
            } else if (typeof json.errorMessage === "undefined") {
                alert(
                    json.errorMessage
                );
            }
            this.fetchPengguna()
        })
        .catch((e) => {
            window.alert(e);
        });
    }

    componentDidMount() {
        this.fetchPengguna()
    }

    render() {
        return (
            <>
                <div>
                    <div className="">
                        <div className="page-title">
                            <div className="title_left">
                                <h3>Pengguna</h3>
                            </div>
                        </div>
                        <div className="clearfix" />
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="x_panel">
                                    <div className="x_title">
                                        <h2>Data Pengguna</h2>&nbsp; &nbsp;<Link to="/admin-tambahpengguna" className="btn btn-primary btn-sm"><i className="fa fa-plus" /> Tambah Data Admin</Link>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="x_content">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="input-group">
                                                    <span className="input-group-btn">
                                                        <Label className="btn btn-default">Cari :</Label>
                                                    </span>
                                                    <Input type="text" className="form-control" placeholder="Cari..." />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                            <table id="surat_masuk" className="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th><center>No</center></th>
                                                        <th><center>ID User</center></th>
                                                        <th><center>Nama Lengkap</center></th>
                                                        <th><center>Nama Pengguna</center></th>
                                                        <th><center>Peran</center></th>
                                                        <th><center>Status</center></th>
                                                        <th><center>Action</center></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.pengguna.map((user, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td><center>{index + 1}</center></td>
                                                                    <td>{user.idUser}</td>
                                                                    <td>{user.namaLengkap}</td>
                                                                    <td>{user.username}</td>
                                                                    <td><center>{user.role}</center></td>
                                                                    <td><center>{user.statusUser === true ? "Aktif" : "Tidak Aktif"}</center></td>
                                                                    <td>
                                                                        <center>
                                                                            {user.role === "Admin"
                                                                                ? <>
                                                                                    <Link to={"/admin-editpengguna/"+user.idUser}>
                                                                                        <button className="text-white btn btn-warning" title="Edit"><i className="fa fa-pencil-square-o" /></button>
                                                                                    </Link>
                                                                                    <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fa fa-file-text-o" /></button>
                                                                                  </>
                                                                                : user.role === "Member"
                                                                                    ? <>
                                                                                        <button className="text-white btn btn-warning" title="Ganti Status" onClick={() => this.resetStatus(user.idUser)}><i className="fa fa-user" /></button>
                                                                                        <button className="text-white btn btn-dark" title="Ganti Password Default" onClick={() => this.resetPassword(user.idUser)}><i className="fa fa-key" /></button>
                                                                                        <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fa fa-file-text-o" /></button>
                                                                                      </>
                                                                                    : <>
                                                                                        <button className="text-white btn btn-warning" title="Ganti Status" onClick={() => this.resetStatus(user.idUser)}><i className="fa fa-user" /></button>
                                                                                        <button className="text-white btn btn-dark" title="Ganti Password Default" onClick={() => this.resetPassword(user.idUser)}><i className="fa fa-key" /></button>
                                                                                        <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fa fa-file-text-o" /></button>
                                                                                      </>
                                                                            }
                                                                        </center>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Rincian Pengguna</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <center><h6>{this.state.usersView.namaLengkap}</h6></center>
                                <table className="table table-borderless table-hover">
                                    <tbody>
                                        <tr>
                                            <td>ID User</td>
                                            <td>{this.state.usersView.idUser}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Pengguna</td>
                                            <td>{this.state.usersView.username}</td>
                                        </tr>
                                        <tr>
                                            <td>Nomor Telepon</td>
                                            <td>{this.state.usersView.nomorTelepon}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{this.state.usersView.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Alamat</td>
                                            <td>{this.state.usersView.alamat}</td>
                                        </tr>
                                        <tr>
                                            <td>Peran</td>
                                            <td>{this.state.usersView.role}</td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>{this.state.usersView.statusUser === true ? "Aktif" : "Tidak Aktif"}</td>
                                        </tr>
                                        <tr>
                                            <td>Tanggal Registrasi</td>
                                            <td>{this.state.usersView.tanggalRegis}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>

            </>

        );
    }
}

export default DataPengguna;