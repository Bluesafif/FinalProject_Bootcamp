import React, { Component } from 'react';
import { Doughnut } from "react-chartjs-2";
import urban from '../../assets/urban.gif'

class DashboardAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            rotiTerjual: 0,
            jumlahPendapatan: 0,
            bulan: 0,
            tahun: 0,
            rotiSold: {
                labels: ["A"],
                datasets: [
                    {
                        label: "Jumlah roti",
                        backgroundColor: [
                            "#B21F00",
                            "#C9DE00",
                            "#2FDE00",
                            "#00A6B4",
                            "#6800B4",
                        ],
                        hoverBackgroundColor: [
                            "#501800",
                            "#4B5000",
                            "#175000",
                            "#003350",
                            "#35014F",
                        ],
                        data: [10]
                    }
                ],
            }
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

    // doughnutChart = () => {
    //     fetch(`http://localhost:8080/roti/grafikRotiTerbeli/?bulan=` + this.state.bulan + `&tahun=` + this.state.tahun + ``, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json; ; charset=utf-8",
    //             "Access-Control-Allow-Headers": "Authorization, Content-Type",
    //             "Access-Control-Allow-Origin": "*",
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((json) => {
    //             const labelRoti = json.map(function (obj) {
    //                 return obj.label;
    //             });
    //             const dataRoti = json.map(function (obj) {
    //                 return obj.data;
    //             });
    //             const listRoti = {
    //                 labels: labelRoti,
    //                 datasets: [
    //                     {
    //                         label: "Total",
    //                         backgroundColor: [
    //                             "#B21F00",
    //                             "#C9DE00",
    //                             "#2FDE00",
    //                             "#00A6B4",
    //                             "#6800B4",
    //                         ],
    //                         hoverBackgroundColor: [
    //                             "#501800",
    //                             "#4B5000",
    //                             "#175000",
    //                             "#003350",
    //                             "#35014F",
    //                         ],
    //                         data: dataRoti,
    //                     },
    //                 ],
    //             };

    //             this.setState({
    //                 rotiSold: listRoti
    //             });
    //         })
    //         .catch(() => {
    //             alert("failed fetching data!")
    //         })
    // }

    componentDidMount() {
        this.rotiCreated()
        this.rotiSold()
        this.pendapatan()
        // this.doughnutChart()

        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();

        // for (let i = 2010; i <= year; i++) {
        //     this.state.pilihanTahun.push(i);
        // }

        this.setState({
            bulan: month+1,
            tahun: year
        })
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
                        <div className="col-md-8 col-sm-12 col-xs-12">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>Bagan</h2>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <div className="col-md-7 col-lg-8 col-sm-7">
                                        <Doughnut
                                            data={this.state.rotiSold}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: "Penjualan Roti Terbanyak Bulan Ini",
                                                    fontSize: 20,
                                                },
                                                legend: {
                                                    display: true,
                                                    position: "right",
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="clearfix" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 float-right">
                            <img src={urban} alt="..." style={{width:"90%", height: "90%", borderRadius: "100%"}} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardAdmin;