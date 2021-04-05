import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';

class RotiAdminContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roti: [],
            rotiListView: {},
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
        fetch(`http://localhost:8080/roti/master/roti/searchadmin?search=`+this.state.search+`&page=`+page+`&limit=` + limit + ``, {
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
        fetch(`http://localhost:8080/roti/master/roti/searchadmincount?idUser=${encodeURIComponent(this.props.userLogin.idUser)}&search=`+this.state.search+``, {
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
                } else if (typeof json.errorMessage === "undefined") {
                    alert(
                        json.errorMessage
                    );
                }
                this.fetchRoti()
            })
            .catch((e) => {
                window.alert(e);
            });
    }

    formatRupiah = (bilangan) => {
        var reverse = bilangan.toString().split("").reverse().join(""),
          ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join(".").split("").reverse().join("");
        return ribuan;
    };

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
                                        &nbsp; &nbsp; &nbsp; &nbsp;<strong><i className="fa fa-trash-o" /></strong> Untuk mengubah status roti menjadi tidak aktif.<br/>
                                        &nbsp; &nbsp; &nbsp; &nbsp;<strong><i className="fa fa-check" /></strong> Untuk mengubah status roti menjadi aktif.
                                    </div>
                                    <div className="x_content">
                                        <div className="input-group">
                                            <input type="search" className="form-control col-md-7" placeholder="Pencarian Nama dan Harga Roti" onChange={this.setValue} value={this.state.search} name="search"/>&nbsp; &nbsp;
                                            <button type="button" className="btn btn-primary" onClick={() => this.search(this.state.page, this.state.limit)}>
                                                <i className="fa fa-search" />
                                            </button>
                                        </div>
                                        <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                            <table className="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr align="center">
                                                        <th rowSpan="2"><div className="padding_bottom">No</div></th>
                                                        <th rowSpan="2"><div className="padding_bottom">Nama Roti</div></th>
                                                        <th colSpan="2">Harga</th>
                                                        <th rowSpan="2"><div className="padding_bottom">Stok</div></th>
                                                        <th rowSpan="2"><div className="padding_bottom">Action</div></th>
                                                    </tr>
                                                    <tr>
                                                        <th><center>Satuan</center></th>
                                                        <th><center>Lusinan</center></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.roti.map((roti, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td><center>{(5*(this.state.page - 1)+(index + 1))}</center></td>
                                                                    <td>{roti.namaRoti}</td>
                                                                    <td><center>Rp. {this.formatRupiah(roti.hargaSatuan)}</center></td>
                                                                    <td><center>Rp. {this.formatRupiah(roti.hargaLusin)}</center></td>
                                                                    <td><center>{roti.stokRoti}</center></td>
                                                                    <td>
                                                                        <center>
                                                                            { roti.statusRoti === true
                                                                            ? <>
                                                                                <Link to={"/admin-editroti/" + roti.idRoti}>
                                                                                    <button className="text-white btn btn-warning" title="Edit"><i className="fa fa-pencil-square-o" /></button>
                                                                                </Link>
                                                                                <button className="btn btn-danger" title="Hapus" onClick={() => this.resetStatus(roti.idRoti)}><i className="fa fa-trash-o" /></button>
                                                                                <button data-toggle="modal" data-target="#exampleModal" className="btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fa fa-file-text-o" /></button>
                                                                            </>
                                                                            : <>
                                                                                <button className="text-white btn btn-success" title="Aktivasi" onClick={() => this.resetStatus(roti.idRoti)}><i className="fa fa-check" /></button>
                                                                                <button data-toggle="modal" data-target="#exampleModal" className="btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fa fa-file-text-o" /></button>
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