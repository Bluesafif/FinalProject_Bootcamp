import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Input, Button } from '../../component';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';
import formatRupiah from '../../util/rupiah.js'

class RotiAdminContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roti: [],
            rotiListView: {},
            page: 1,
            limit: 5,
            count: 0,
            search: "",
            pageNew: 1
        }
    }

    setValue = el => {
        if (el.target.name === "search" && el.target.value === "") {
            this.fetchRoti(this.state.pageNew, this.state.limit)
            this.getCount()
        }
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    handleChange = (event, value) => {
        this.setState({
            page: value
        })
        if (this.state.search === "") {
            this.fetchRoti(value, 5);
        } else {
            this.search(value, 5)
        }
    }

    fetchRoti = (page, limit) => {
        if (page === undefined) {
            page = 1
        }
        fetch(`http://localhost:8080/roti/master/roti?limit=` + this.state.limit + `&page=` + page + '', {
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
                    roti: json,
                });
            })
            .catch(() => {
                alert("failed fetching data");
            });
    };

    search = (page, limit) => {
        this.getCountSearch()
        if (page === undefined) {
            this.setState({
                page : 1
            })
        }
        fetch(`http://localhost:8080/roti/master/roti/searchadmin?search=` + this.state.search + `&page=` + page + `&limit=` + limit + ``, {
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
                    roti: json,
                });
            })
            .catch(() => {
            })
    }

    getCount = () => {
        fetch(`http://localhost:8080/roti/master/roti-count/?idUser=${encodeURIComponent(this.props.userLogin.idUser)}`, {
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
        fetch(`http://localhost:8080/roti/master/roti/searchadmincount?idUser=${encodeURIComponent(this.props.userLogin.idUser)}&search=` + this.state.search + ``, {
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
        const rotiView = this.state.roti[index]
        this.setState({
            rotiListView: rotiView
        })
    }

    resetStatus = (idRoti) => {
        if (window.confirm("Apakah anda yakin ingin mengubah status roti?")) {
            fetch(`http://localhost:8080/roti/master/roti/status/` + idRoti, {
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
                    this.fetchRoti()
                })
                .catch((e) => {
                    window.alert(e);
                });
        }
    }

    componentDidMount() {
        this.fetchRoti()
        this.getCount()
    }

    render() {
        return (
            <>
                <div>
                    <div className="">
                        <div className="page-title">
                            <div className="title_left">
                                <h3>Roti</h3>
                            </div>
                        </div>
                        <div className="clearfix" />
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="x_panel">
                                    <div className="x_title">
                                        <h2>Data Roti</h2>&nbsp; &nbsp;<Link to="/admin-tambahroti" className="btn btn-primary btn-sm float-right"><i className="fa fa-plus" /> Tambah Data Roti</Link>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="alert alert-info alert-dismissible bg-blue-sky" role="alert">
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                        </button>
                                        <p><strong>Keterangan:</strong></p>
                                        &nbsp; &nbsp; &nbsp; &nbsp;<strong><i className="far fa-trash-alt" /></strong> Untuk mengubah status roti menjadi tidak aktif.<br />
                                        &nbsp; &nbsp; &nbsp; &nbsp;<strong><i className="fa fa-check" /></strong> Untuk mengubah status roti menjadi aktif.
                                    </div>
                                    <div className="x_content">
                                        <div className="col-md-5 col-sm-5">
                                            <div className="input-group">
                                                <Input type="search" className="form-control" placeholder="Pencarian Nama dan Harga Roti" onChange={this.setValue} value={this.state.search} name="search" />
                                                <span className="input-group-btn">
                                                    <Button type="button" className="text-white btn btn-primary" onClick={() => this.search(this.state.page, this.state.limit)}>
                                                        <i className="fa fa-search" />
                                                    </Button>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                            <table className="table table-striped jambo_table bulk_action">
                                                <thead>
                                                    <tr align="center" className="headings">
                                                        <th rowSpan="2" style={{verticalAlign: "middle"}}>No</th>
                                                        <th rowSpan="2" style={{verticalAlign: "middle"}}>Nama Roti</th>
                                                        <th colSpan="2">Harga</th>
                                                        <th rowSpan="2" style={{verticalAlign: "middle"}}>Stok</th>
                                                        <th rowSpan="2" style={{verticalAlign: "middle"}}>Action</th>
                                                    </tr>
                                                    <tr align="center" className="headings">
                                                        <th>Satuan</th>
                                                        <th>Lusinan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.roti.map((roti, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{verticalAlign: "middle"}}><center>{(5 * (this.state.page - 1) + (index + 1))}</center></td>
                                                                    <td style={{verticalAlign: "middle"}}>{roti.namaRoti}</td>
                                                                    <td style={{verticalAlign: "middle"}}><center>{formatRupiah(roti.hargaSatuan)}</center></td>
                                                                    <td style={{verticalAlign: "middle"}}><center>{formatRupiah(roti.hargaLusin)}</center></td>
                                                                    <td style={{verticalAlign: "middle"}}><center>{roti.stokRoti}</center></td>
                                                                    <td style={{verticalAlign: "middle"}}>
                                                                        <center>
                                                                            {roti.statusRoti === true
                                                                                ? <>
                                                                                    <Link to={"/admin-editroti/" + roti.idRoti}>
                                                                                        <Button className="buttons text-white btn btn-warning" title="Edit"><i className="fa fa-pencil-square-o" /></Button>
                                                                                    </Link>
                                                                                    <Button className="buttons btn btn-danger" title="Hapus" onClick={() => this.resetStatus(roti.idRoti)}><i className="far fa-trash-alt" /></Button>
                                                                                    <button data-toggle="modal" data-target="#exampleModal" className="buttons btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fas fa-file-alt" /></button>
                                                                                </>
                                                                                : <>
                                                                                    <Button className="buttons text-white btn btn-success" title="Aktivasi" onClick={() => this.resetStatus(roti.idRoti)}><i className="fa fa-check" /></Button>
                                                                                    <button data-toggle="modal" data-target="#exampleModal" className="buttons btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fas fa-file-alt" /></button>
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
                                <h5 className="modal-title" id="exampleModalLabel">Rincian Roti</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <center><h6>{this.state.rotiListView.namaRoti}</h6></center>
                                <table className="table table-borderless table-hover">
                                    <tbody>
                                        <tr>
                                            <td>Jenis Roti</td>
                                            <td>{this.state.rotiListView.jenisRoti}</td>
                                        </tr>
                                        <tr>
                                            <td>Stok Roti</td>
                                            <td>{this.state.rotiListView.stokRoti}</td>
                                        </tr>
                                        <tr>
                                            <td>Harga Satuan</td>
                                            <td>Rp. {this.state.rotiListView.hargaSatuan}/pcs</td>
                                        </tr>
                                        <tr>
                                            <td>Harga Lusinan</td>
                                            <td>Rp. {this.state.rotiListView.hargaLusin}/pcs</td>
                                        </tr>
                                        <tr>
                                            <td>Keterangan</td>
                                            <td>{this.state.rotiListView.keterangan}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(RotiAdminContent);