import React, { Component } from 'react';

class DashboardAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            rotiTerjual: 0,
            jumlahPendapatan: 0
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

    componentDidMount(){
        this.rotiCreated()
        this.rotiSold()
        this.pendapatan()
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
                                <div className="icon"><i className="fas fa-bread-slice"/></div>
                                <div className="count">{this.state.count}</div>
                                <h3>Roti Terbuat</h3>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fas fa-bread-slice"/></div>
                                <div className="count">{this.state.rotiTerjual}</div>
                                <h3>Roti Terjual</h3>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-money" /></div>
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
            </div>
        );
    }
}

export default DashboardAdmin;