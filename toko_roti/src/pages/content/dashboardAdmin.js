import React, { Component } from 'react';
// import urban from '../../assets/urban.gif'
import logo from '../../assets/logo2.png'
import satu from '../../assets/satu.png';

class DashboardAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            rotiTerjual: 0,
            jumlahPendapatan: 0,
            bulan: 0,
            tahun: 0,
            namaRoti: "",
            jumlahRoti: ""
        }
    }

    rotiCreated = () => {
        fetch('http://localhost:8080/roti/master/roti/stok-count', {
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
                    count: Number(json)
                });
            })
            .catch((e) => {
                alert(e);
            });
    }

    rotiSold = () => {
        fetch(`http://localhost:8080/roti/laporan/allrotiterjual`, {
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
                    rotiTerjual: Number(json),
                });
            })
            .catch(() => {
            })
    }

    pendapatan = () => {
        fetch(`http://localhost:8080/roti/laporan/allpendapatancount`, {
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
                    jumlahPendapatan: Number(json),
                });
            })
            .catch(() => {
            })
    }

    formatRupiah = (bilangan) => {
        var reverse = bilangan.toString().split("").reverse().join(""),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join(".").split("").reverse().join("");
        return ribuan;
    };

    rotiTerjualTerbanyak = () => {
        fetch(`http://localhost:8080/roti/grafikRotiTerbeli/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((response) => response.json())
            .then((json) => {
                const labelRoti = json.map(function (obj) {
                    return obj.label;
                });
                const dataRoti = json.map(function (obj) {
                    return obj.data;
                });

                this.setState({
                    namaRoti: labelRoti,
                    jumlahRoti: dataRoti
                });
            })
            .catch(() => {
                alert("failed fetching data!")
            })
    }

    componentDidMount() {
        this.rotiCreated()
        this.rotiSold()
        this.pendapatan()
        this.rotiTerjualTerbanyak()
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
                                <div className="icon"><i className="fas fa-bread-slice" /></div>
                                <div className="count">{this.state.count}</div>
                                <h3>Roti Terbuat</h3>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fas fa-bread-slice" /></div>
                                <div className="count">{this.state.rotiTerjual}</div>
                                <h3>Roti Terjual</h3>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="glyphicon glyphicon-usd" /></div>
                                <div className="count">Rp. {this.formatRupiah(this.state.jumlahPendapatan)}</div>
                                <h3>Pendapatan Sebulan</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>Selamat Datang</h2>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <div className="col-md-8 col-lg-8 col-sm-7">
                                        <blockquote>
                                            <span className="info-box-number">SELAMAT DATANG DI URBAN BAKERY WORKS.</span>
                                            <p>Silahkan pilih menu Navigator untuk mempermudah anda.</p>
                                        </blockquote>
                                    </div>
                                    <div className="clearfix" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>Roti Terjual Terbanyak</h2>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <div>
                                        <table className="table table-borderless table-hover">
                                            <thead>
                                                <tr align="center">
                                                    <td rowSpan="2"><img src={satu} alt="..."/></td>
                                                    <td><h1>{this.state.namaRoti}</h1></td>
                                                </tr>
                                                <tr align="center">
                                                    <td><h1>{this.state.jumlahRoti}</h1></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="clearfix" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <img src={logo} alt="..." style={{width:"95%", height: "95%"}} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardAdmin;