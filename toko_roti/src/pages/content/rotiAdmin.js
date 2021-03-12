import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class RotiAdminContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roti: [],
            rotiListView: {}
        }
    }

    fetchRoti = () => {
        fetch(`http://localhost:8080/roti/master/roti`, {
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

    view = (index) => {
        const rotiView = this.state.roti[index]
        this.setState({
            rotiListView: rotiView
        })
    }

    componentDidMount() {
        this.fetchRoti()
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
                                        <h2>Data Roti</h2>&nbsp; &nbsp;<Link to="/admin-tambahroti" className="btn btn-primary btn-sm"><i className="fa fa-plus" /> Tambah Data Roti</Link>
                                        <ul className="nav navbar-right panel_toolbox">
                                            <li><Link className="collapse-link"><i className="fa fa-chevron-up" /></Link></li>
                                        </ul>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="x_content">
                                        <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                            <table id="surat_masuk" className="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th><center>No</center></th>
                                                        <th><center>Nama Roti</center></th>
                                                        <th><center>Harga Satuan</center></th>
                                                        <th><center>Stok</center></th>
                                                        <th><center>Action</center></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.roti.map((roti, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td><center>{index + 1}</center></td>
                                                                    <td>{roti.namaRoti}</td>
                                                                    <td><center>Rp. {roti.hargaSatuan}</center></td>
                                                                    <td><center>{roti.stokRoti}</center></td>
                                                                    <td>
                                                                        <center>
                                                                            <Link to={"/admin-editroti/"+roti.idRoti}>
                                                                                <button className="text-white btn btn-warning" title="Edit"><i className="fa fa-pencil-square-o" /></button>
                                                                            </Link>
                                                                            <button className="btn btn-danger" title="Hapus"><i className="fa fa-trash-o" /></button>
                                                                            <button data-toggle="modal" data-target="#exampleModal" className="btn btn-secondary" title="Detail" onClick={() => this.view(index)}><i className="fa fa-file-text-o" /></button>
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

export default RotiAdminContent;