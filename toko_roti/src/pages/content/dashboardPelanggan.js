import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardPelanggan extends Component {
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
                            <h3>Beranda</h3>
                        </div>
                    </div>
                    <div className="clearfix" />
                    <div className="row top_tiles">
                        <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-check" /></div>
                                <div className="count">Status</div>
                                <h3>{this.props.userLogin.role}</h3>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-bread" /></div>
                                <div className="count">0</div>
                                <h3>Jumlah Roti</h3>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-money" /></div>
                                <div className="count">Rp.0</div>
                                <h3>Biaya Pengeluaran</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>Welcome</h2>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <div className="col-md-8 col-lg-8 col-sm-7">
                                        <blockquote>
                                            <span className="info-box-number">SELAMAT DATANG DI URBAN BAKERY WORKS.</span>
                                            <p>Silahkan pilih menu Navigator untuk mempermudah anda.</p>
                                            <footer>Jangan lupa senyum hari ini ;)</footer>
                                        </blockquote>
                                    </div>
                                    <div className="clearfix" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-6 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Daftar Roti <small>Terbeli</small></h2>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <table id="surat_masuk" className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th><center>No</center></th>
                                            <th><center>ID Keranjang</center></th>
                                            <th><center>Roti Terbeli</center></th>
                                            <th><center>Tanggal Beli</center></th>
                                            <th><center>Total</center></th>
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
                                            <td>
                                                <center>
                                                    <a href="index.php?page=disposisi&id=<?php echo $data['id'] ?>" className="btn btn-secondary" title="Disposisi"><i className="fa fa-file-text-o" /></a>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPelanggan);