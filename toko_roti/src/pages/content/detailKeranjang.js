import React, { Component } from 'react';
import { Button, Label } from '../../component';
import rotiGambar from '../../assets/roti.jpg'
import { connect } from 'react-redux';
import $ from "jquery";

class DetailKeranjang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keranjang: {},
            rotiList: [],
            totalHarga: [],
            jumlahTotal: 0,
            diskon: 0,
            jumlahPembayaran: 0
        }
    }

    fetchKeranjang = () => {
        fetch(`http://localhost:8080/roti/keranjang/?idUser=${encodeURIComponent(this.props.userLogin.idUser)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    keranjang: json,
                });
                if ($.isEmptyObject(this.state.keranjang) === true) {
                    this.setState({
                        rotiList: []
                    })
                } else {
                    this.setState({
                        rotiList: this.state.keranjang.rotiList,
                    });
                }
                if (this.props.userLogin.role === "Member") {
                    let hargaTotal = [];
                    for (let i = 0; i < this.state.rotiList.length; i++) {
                        hargaTotal.push(this.state.rotiList[i].kuantitas * this.state.rotiList[i].hargaSatuan)
                    }
                    this.setState({
                        totalHarga: hargaTotal,
                    });

                    let totalHarga = 0;
                    for (let i = 0; i < this.state.totalHarga.length; i++) {
                        totalHarga = totalHarga + this.state.totalHarga[i];
                    }
                    this.setState({
                        jumlahTotal: totalHarga
                    })

                    this.setState({
                        diskon: this.state.jumlahTotal * 0.1
                    })
                } else if (this.props.userLogin.role === "Umum") {
                    let hargaTotal = [];
                    for (let i = 0; i < this.state.rotiList.length; i++) {
                        hargaTotal.push(this.state.rotiList[i].kuantitas * this.state.rotiList[i].hargaSatuan)
                    }
                    this.setState({
                        totalHarga: hargaTotal,
                    });

                    let totalHarga = 0;
                    for (let i = 0; i < this.state.totalHarga.length; i++) {
                        totalHarga = totalHarga + this.state.totalHarga[i];
                    }
                    this.setState({
                        jumlahTotal: totalHarga
                    })
                }
                this.setState({
                    jumlahPembayaran: this.state.jumlahTotal - this.state.diskon
                })
            })
            .catch(() => {
            });
    };

    delete = (idDetail) => {
        if (window.confirm("Apakah anda yakin ingin menghapus?")) {
            fetch(`http://localhost:8080/roti/detail-keranjang/` + idDetail, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*",
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    this.setState({
                        keranjang: json,
                    });
                })
                .catch(() => {
                });
                window.alert("Anda telah berhasil menghapus!")
                this.fetchKeranjang()
        }
    }

    componentDidMount() {
        this.fetchKeranjang()
    }

    render() {
       
        return (
            <div>
                <div className="">
                    <div className="page-title">
                        <div className="title_left">
                            <h3>Keranjang</h3>
                        </div>
                    </div>
                    <div className="clearfix" />
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>Detail Keranjang</h2>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                        <table id="surat_masuk" className="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th><center>Gambar</center></th>
                                                    <th><center>Nama Roti</center></th>
                                                    <th><center>Harga Satuan</center></th>
                                                    <th><center>Kuantitas</center></th>
                                                    <th><center>Total Harga</center></th>
                                                    <th><center>Action</center></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.rotiList.length === 0
                                                    ? <tr>
                                                        <td colSpan="6" align="center">Keranjang Kosong</td>
                                                    </tr>
                                                    : <>
                                                        {
                                                            this.state.rotiList.map((detail, index) => {
                                                                return (
                                                                    <>
                                                                        <tr key={index}>
                                                                            <td><center><img src={rotiGambar} alt="..." className="keranjang-img" /></center></td>
                                                                            <td><center>{detail.namaRoti}</center></td>
                                                                            <td><center>Rp. {detail.hargaSatuan}</center></td>
                                                                            <td>
                                                                                <center>
                                                                                    <Label>{detail.kuantitas}</Label>
                                                                                </center>
                                                                            </td>
                                                                            <td><center>Rp. {this.state.totalHarga[index]}</center></td>
                                                                            <td>
                                                                                <center>
                                                                                    <Button className="btn btn-danger" title="Hapus" onClick={() => this.delete(detail.idDetail)} ><i className="fa fa-trash-o" /></Button>
                                                                                </center>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Jumlah Total</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Label className="control-label col-md-3 col-sm-3 col-xs-12">: Rp. {this.state.jumlahTotal}</Label>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Diskon</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Label className="control-label col-md-3 col-sm-3 col-xs-12">: Rp. {this.state.diskon}</Label>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Jumlah Pembayaran</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Label className="control-label col-md-3 col-sm-3 col-xs-12">: Rp. {this.state.jumlahPembayaran}</Label>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Button className="btn btn-success control-label col-md-3 col-sm-3 col-xs-12">Checkout</Button>
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
    userLogin: state.AReducer.dataUser
})

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({ type: "LOGOUT_SUCCESS" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailKeranjang);