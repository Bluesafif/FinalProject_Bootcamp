import React, { Component } from 'react';
import { Button, Label, Input } from '../../component';
import rotiGambar from '../../assets/roti.jpg'
import { connect } from 'react-redux';
import $ from "jquery";

class DetailKeranjang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keranjang: {},
            roti: [],
            rotiList: [],
            totalHarga: [],
            jumlahTotal: 0,
            diskon: 0,
            kuantitas: [],
            jumlahPembayaran: 0,
            userProfil: {}
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
          this.fetchKeranjang()
      })
      .catch((e) => {
          console.log(e);
          
      });
      };

    setValueHarga = (value,idDetail) => {
        fetch(`http://localhost:8080/roti/update-qty?idDetail=`+idDetail+`&kuantitas=`+value+``, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((response) => response.json())
        .then((json) => {
            this.fetchKeranjang()
        })
        .catch(() => {
        });
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
            if (this.state.userProfil.role === "Member") {
                let qty = [];
                for (let i = 0; i < this.state.rotiList.length; i++) {
                    qty.push(this.state.rotiList[i].kuantitas)
                }
                this.setState({
                    kuantitas: qty
                })

                let hargaTotal = [];
                for (let i = 0; i < this.state.rotiList.length; i++) {
                    if (this.state.kuantitas[i] >= 12) {
                        hargaTotal.push(this.state.kuantitas[i] * this.state.rotiList[i].hargaLusin)
                    } else {
                        hargaTotal.push(this.state.kuantitas[i] * this.state.rotiList[i].hargaSatuan)
                    }
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
            } else if (this.state.userProfil.role === "Umum") {
                let qty = [];
                for (let i = 0; i < this.state.rotiList.length; i++) {
                    qty.push(this.state.rotiList[i].kuantitas)
                }
                this.setState({
                    kuantitas: qty
                })
                
                let hargaTotal = [];
                for (let i = 0; i < this.state.rotiList.length; i++) {
                    if (this.state.kuantitas[i] >= 12) {
                        hargaTotal.push(this.state.kuantitas[i] * this.state.rotiList[i].hargaLusin)
                    } else {
                        hargaTotal.push(this.state.kuantitas[i] * this.state.rotiList[i].hargaSatuan)
                    }
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
            if (this.state.rotiList.length > 1) {
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
            } else if (this.state.rotiList.length <= 1) {
                let idKeranjang = this.state.keranjang.idKeranjang
                fetch(`http://localhost:8080/roti/allDetail-keranjang/?idDetail=`+ idDetail +`&idKeranjang=`+idKeranjang+``, {
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
                    window.location.reload();
                }
            this.fetchKeranjang()
        }
    }

    checkout = () => {
        let listRoti = []
        for (let i = 0; i < this.state.rotiList.length; i++) {
            let hargaTmp = 0
            if (this.state.rotiList[i].kuantitas >= 12) {
                hargaTmp = this.state.rotiList[i].hargaLusin
            } else {
                hargaTmp = this.state.rotiList[i].hargaSatuan
            }

            let isi= {
                idRoti: this.state.rotiList[i].idRoti,
                namaRoti: this.state.rotiList[i].namaRoti,
                harga: hargaTmp,
                kuantitas: this.state.rotiList[i].kuantitas,
                totalHarga: this.state.rotiList[i].totalHarga
            }
            listRoti.push(isi)
        }
        const objekCheckout = {
            idKeranjang: this.state.keranjang.idKeranjang,
            idUser: this.props.userLogin.idUser,
            jumlahTotal: this.state.jumlahTotal,
            diskon: this.state.diskon,
            jumlahPembayaran: this.state.jumlahPembayaran,
            rotiList: listRoti
        }

        fetch(`http://localhost:8080/roti/laporan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(objekCheckout)
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
            window.location.reload();
        })
        .catch(() => {
            alert("failed fetching data");
        });
    }

    componentDidMount() {
        this.getProfil()
        this.fetchKeranjang()
    }

    render() {
        console.log(this.state.keranjang);
        console.log(this.state.rotiList);
        console.log(this.state.kuantitas);
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
                                                    <th><center>Harga</center></th>
                                                    <th width="50"><center>Kuantitas</center></th>
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
                                                                            <td>
                                                                                <center>
                                                                                    <img src={rotiGambar} alt="..." className="keranjang-img" />
                                                                                </center>
                                                                            </td>
                                                                            <td>
                                                                                <center>
                                                                                    {detail.namaRoti}
                                                                                </center>
                                                                            </td>
                                                                            {this.state.kuantitas[index] >= 12
                                                                                ? <td>
                                                                                    <center>
                                                                                        Rp. {detail.hargaLusin}
                                                                                    </center>
                                                                                </td>
                                                                                : <td>
                                                                                    <center>
                                                                                        Rp. {detail.hargaSatuan}
                                                                                    </center>
                                                                                </td>
                                                                            }
                                                                            <td align="center">
                                                                                <center>
                                                                                    <Input className="col-md-12" type="number" name="kuantitas[index]" value={this.state.kuantitas[index]} onChange={event=>{this.setValueHarga(event.target.value, detail.idDetail)}} min="1" max={detail.stokRoti}></Input>
                                                                                </center>
                                                                            </td>
                                                                            <td>
                                                                                <center>
                                                                                    Rp. {this.state.totalHarga[index]}
                                                                                </center>
                                                                            </td>
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
                                            <Label className="control-label col-md-6 col-sm-3 col-xs-12">: Rp. {this.state.jumlahTotal}</Label>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Diskon</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Label className="control-label col-md-6 col-sm-3 col-xs-12">: Rp. {this.state.diskon}</Label>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Jumlah Pembayaran</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Label className="control-label col-md-6 col-sm-3 col-xs-12">: Rp. {this.state.jumlahPembayaran}</Label>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Button className="btn btn-success control-label col-md-3 col-sm-3 col-xs-12" onClick={() => this.checkout()}>Checkout</Button>
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
 
export default connect(mapStateToProps, mapDispatchToProps)(DetailKeranjang);