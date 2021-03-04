import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Search } from '../../component';

class RotiAdminContent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
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
                                    <h2>Data Roti</h2>&nbsp; &nbsp;<a href="index.php?page=tambah_surat_masuk" className="btn btn-primary btn-sm"><i className="fa fa-plus" /> Tambah Data Roti</a>
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
                                                    <th>No</th>
                                                    <th><center>Nama Roti</center></th>
                                                    <th><center>Harga Satuan</center></th>
                                                    <th><center>Stok</center></th>
                                                    <th><center>Action</center></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <center>
                                                            <a href="index.php?page=edit_surat_masuk&id=<?php echo $data['id']; ?>" className="btn btn-warning" title="Edit"><i className="fa fa-pencil-square-o" /></a>
                                                            <a href="index.php?page=hapus_surat_masuk&id=<?php echo $data['id'] ?>" className="btn btn-danger" title="Hapus"><i className="fa fa-trash-o" /></a>
                                                            <a href="index.php?page=disposisi&id=<?php echo $data['id'] ?>" className="btn btn-secondary" title="Detail"><i className="fa fa-file-text-o" /></a>
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
        );
    }
}

export default RotiAdminContent;