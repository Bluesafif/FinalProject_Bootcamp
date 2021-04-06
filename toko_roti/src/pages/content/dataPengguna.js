import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Input, Button } from '../../component';
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';

class DataPengguna extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pengguna: [],
            usersView: {},
            page: 1,
            limit: 5,
            count: 0,
            search: ""
        }
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    handleChange = (event, value) => {
        this.setState({
            page: value
        })
        if (this.state.search === "") {
            this.fetchPengguna(value, 5);
        } else {
            this.search(value, 5)
        }
    }

    fetchPengguna = (page, limit) => {
        if (page === undefined) {
            page = 1
        }
        fetch(`http://localhost:8080/roti/master/user?limit=` + this.state.limit + `&page=` + page + ``, {
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

    search = (page, limit) => {
        this.getCountSearch()
        fetch(`http://localhost:8080/roti/master/user/searchadmin?search=` + this.state.search + `&page=` + page + `&limit=` + limit + ``, {
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
            })
    }

    getCount = () => {
        fetch('http://localhost:8080/roti/master/user-count/', {
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
                    count: Math.ceil(Number(json) / this.state.limit)
                });
            })
            .catch((e) => {
                alert(e);
            });
    }

    getCountSearch = () => {
        fetch(`http://localhost:8080/roti/master/user/searchadmincount?search=` + this.state.search + ``, {
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
                    count: Math.ceil(Number(json) / this.state.limit)
                });
            })
            .catch((e) => {
                alert(e);
            });
    }

    view = (index) => {
        const userView = this.state.pengguna[index]
        this.setState({
            usersView: userView
        })
    }

    resetStatus = (idUser) => {
        if (window.confirm("Apakah anda yakin ingin mengubah status?")) {
            fetch(`http://localhost:8080/roti/master/user/status/` + idUser, {
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
                    } else if (typeof json.successMessage !== "undefined") {
                        alert(
                            json.successMessage
                        );
                    }
                    this.fetchPengguna()
                })
                .catch((e) => {
                    window.alert(e);
                });
        }
    }

    resetPassword = (idUser) => {
        if (window.confirm("Apakah anda yakin ingin mengubah password menjadi default?")) {
            fetch(`http://localhost:8080/roti/master/user/password/` + idUser, {
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
                    } else if (typeof json.successMessage !== "undefined") {
                        alert(
                            json.successMessage
                        );
                    }
                    this.fetchPengguna()
                })
                .catch((e) => {
                    window.alert(e);
                });
        }
    }

    componentDidMount() {
        this.fetchPengguna()
        this.getCount()
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
                                        <h2>Data Pengguna</h2>&nbsp; &nbsp;<Link to="/admin-tambahpengguna" className="btn btn-primary btn-sm float-right"><i className="fa fa-plus" /> Tambah Data Admin</Link>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="x_content">
                                        <div className="input-group">
                                            <Input type="search" className="form-control col-md-7" placeholder="Pencarian Id User, Nama Lengkap, Nama Pengguna, dan Peran" onChange={this.setValue} value={this.state.search} name="search" />&nbsp; &nbsp;
                                            <Button type="button" className="btn btn-primary" onClick={() => this.search(this.state.page, this.state.limit)}>
                                                <i className="fa fa-search" />
                                            </Button>
                                        </div>
                                        <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                            <table className="table table-striped table-bordered table-hover">
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
                                                                    <td><center>{(5 * (this.state.page - 1) + (index + 1))}</center></td>
                                                                    <td>{user.idUser.substring(0, 8)}</td>
                                                                    <td>{user.namaLengkap}</td>
                                                                    <td>{user.username}</td>
                                                                    <td><center>{user.role}</center></td>
                                                                    <td><center>{user.statusUser === true ? "Aktif" : "Tidak Aktif"}</center></td>
                                                                    <td>
                                                                        <center>
                                                                            {user.role === "Admin"
                                                                                ? user.idUser === this.props.userLogin.idUser
                                                                                    ? <>
                                                                                        <Link to={"/admin-editpengguna/" + user.idUser}>
                                                                                            <button className="text-white btn btn-warning" title="Edit"><i className="fa fa-pencil-square-o" /></button>
                                                                                        </Link>
                                                                                        <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fas fa-file-alt" /></button>
                                                                                    </>
                                                                                    : <>
                                                                                        <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fas fa-file-alt" /></button>
                                                                                    </>
                                                                                : user.role === "Member"
                                                                                    ? <>
                                                                                        <button className="text-white btn btn-warning" title="Ganti Status" onClick={() => this.resetStatus(user.idUser)}><i className="fa fa-user" /></button>
                                                                                        <button className="text-white btn btn-dark" title="Ganti Password Default" onClick={() => this.resetPassword(user.idUser)}><i className="fa fa-key" /></button>
                                                                                        <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fas fa-file-alt" /></button>
                                                                                    </>
                                                                                    : <>
                                                                                        <button className="text-white btn btn-warning" title="Ganti Status" onClick={() => this.resetStatus(user.idUser)}><i className="fa fa-user" /></button>
                                                                                        <button className="text-white btn btn-dark" title="Ganti Password Default" onClick={() => this.resetPassword(user.idUser)}><i className="fa fa-key" /></button>
                                                                                        <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fas fa-file-alt" /></button>
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
                                        <div className="pagination float-right">
                                            {/* <Typography>Page: {page}</Typography> */}
                                            <Pagination count={this.state.count} page={this.state.page} onChange={this.handleChange} />
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

const mapStateToProps = state => ({
    checkLogin: state.AReducer.isLogin,
    userLogin: state.AReducer.dataUser,
    users: state.UReducer.users
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPengguna);