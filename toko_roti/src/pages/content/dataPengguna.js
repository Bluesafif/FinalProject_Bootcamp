import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Input, Label } from '../../component';

class DataPengguna extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
                                        <h2>Data Pengguna</h2>&nbsp; &nbsp;<Link to="###" className="btn btn-primary btn-sm"><i className="fa fa-plus" /> Tambah Data Pengguna</Link>
                                        <ul className="nav navbar-right panel_toolbox">
                                            <li><Link className="collapse-link"><i className="fa fa-chevron-up" /></Link></li>
                                        </ul>
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
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>
                                                            <center>
                                                                <button href="index.php?page=edit_surat_masuk&id=<?php echo $data['id']; ?>" className="text-white btn btn-warning" title="Edit"><i className="fa fa-pencil-square-o" /></button>
                                                                <button href="index.php?page=hapus_surat_masuk&id=<?php echo $data['id'] ?>" className="text-white btn btn-danger" title="Hapus"><i className="fa fa-trash-o" /></button>
                                                                <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Detail"><i className="fa fa-file-text-o" /></button>
                                                            </center>
                                                        </td>
                                                    </tr>
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
                                ...
                            </div>
                        </div>
                    </div>
                </div>

            </>

        );
    }
}

export default DataPengguna;