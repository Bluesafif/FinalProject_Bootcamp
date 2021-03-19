import React, { Component } from 'react';
import rotiGambar from '../../assets/roti.jpg'
import { connect } from 'react-redux';
import $ from "jquery";

class RotiPelangganContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roti: [],
            rotiListView: {},
            keranjang: {},
            rotiList: [],
            qty: 1
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

    getKeranjang = () => {
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
                keranjang: json
            });
            if ($.isEmptyObject(json) === true) {
                this.setState({
                    rotiList: []
                });
            } else {
                this.setState({
                    rotiList: this.state.keranjang.rotiList
                });
            }
        })
        .catch(() => {
        });
    }

    addToCart = () => {
        this.getKeranjang()
        if ($.isEmptyObject(this.state.keranjang) === true) {
            const objekAdd = {
                idUser: this.props.userLogin.idUser,
                idRoti: this.state.rotiListView.idRoti,
                kuantitas: this.state.qty
            };
            fetch(`http://localhost:8080/roti/keranjang/?idUser=${encodeURIComponent(this.props.userLogin.idUser)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(objekAdd)
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
            })
            .catch(() => {
            });
        } else {
            const objekAdd2 = {
                idUser: this.props.userLogin.idUser,
                idKeranjang: this.state.keranjang.idKeranjang,
                idRoti: this.state.rotiListView.idRoti,
                kuantitas: this.state.qty
            }
            let check;
            for (let i = 0; i < this.state.rotiList.length; i++) {
                if (this.state.rotiList[i].idRoti === objekAdd2.idRoti) {
                    check = true
                    break;
                } else {
                    check = false
                }
            }
            if (check === false || this.state.rotiList.length === 0) {
                fetch(`http://localhost:8080/roti/keranjang/?idUser=${encodeURIComponent(this.props.userLogin.idUser)}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; ; charset=utf-8",
                        "Access-Control-Allow-Headers": "Authorization, Content-Type",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify(objekAdd2)
                })
                .then((response) => response.json())
                .then((json) => {
                    if (typeof json.errorMessage !== "undefined") {
                        alert(json.errorMessage);
                    } else if (typeof json.errorMessage === "undefined") {
                        alert(
                            json.errorMessage
                        );
                        window.location.reload();
                    }
                })
                .catch(() => {
                    alert("failed fetching data");
                });
            } else {
                alert("Roti Sudah Tersedia di Keranjang")
            }
        }
    }

    componentDidMount() {
        this.fetchRoti()
        this.getKeranjang()
    }
    
    render() {
        console.log(this.state.keranjang);
        console.log(this.state.rotiList);
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
                                        <h2>List Roti</h2>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="x_content">
                                        <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                            {
                                                this.state.roti.map((roti, index) => {
                                                    return (
                                                        <>
                                                        <div className="row row-content padding">
                                                            <div className="product-wrap mb-20">
                                                                <div className="product-img b-s" data-toggle="modal" data-target="#exampleModal" onClick={() => this.view(index)}>
                                                                    <img src={rotiGambar} alt="..." className="default-img" />
                                                                </div>
                                                                <div className="product-content">
                                                                    <div className="product-header"></div>
                                                                    <h3 className="b-s" title="Kacang Mede Original" data-toggle="modal" data-target="#exampleModal" onClick={() => this.view(index)}>{roti.namaRoti} &nbsp;
                                                                    {roti.stokRoti === 0 && <span className="badge badge-danger">Habis</span>}</h3>
                                                                </div>
                                                                <div className="product-realprice">&nbsp;</div>
                                                                <div className="product-price">
                                                                    <span>&nbsp;&nbsp;Rp. {roti.hargaSatuan}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </>
                                                    )
                                                })
                                            }
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
                                {this.state.rotiListView.stokRoti === 0
                                    ?<button className="text-white btn btn-warning width" title="Tambah ke Keranjang" disabled="disabled"><i className="fa fa-times" /> Stok Habis</button>
                                    :<button className="text-white btn btn-warning width" title="Tambah ke Keranjang" onClick={() => this.addToCart(this.state.rotiListView)}><i className="fa fa-shopping-cart" /> Masukkan ke Keranjang</button>
                                }
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
 
export default connect(mapStateToProps, mapDispatchToProps)(RotiPelangganContent);