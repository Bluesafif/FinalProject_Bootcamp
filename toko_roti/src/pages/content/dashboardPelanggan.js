import React, { Component } from 'react';
import { connect } from 'react-redux';
import rotiGambar from '../../assets/roti.jpg'

class DashboardPelanggan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            laporan: [],
            laporanView: [],
            bulan: 0,
            tahun: 0,
            count: 0,
            jumlah: 0
        }
    }

    fetchLaporan = () => {
        fetch(`http://localhost:8080/roti/laporancustomer/?idUser=${encodeURIComponent(this.props.userLogin.idUser)}`, {
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
                    laporan: json,
                });
            })
            .catch(() => {
            })
    }

    fetchCountPembelian = () => {
        fetch(`http://localhost:8080/roti/laporan/allkuantitascount?idUser=${encodeURIComponent(this.props.userLogin.idUser)}`, {
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
                    count: json,
                });
            })
            .catch(() => {
            })
    }

    fetchCountTotal = () => {
        fetch(`http://localhost:8080/roti/laporan/allpengeluarancount?idUser=${encodeURIComponent(this.props.userLogin.idUser)}`, {
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
                    jumlah: json,
                });
            })
            .catch(() => {
            })
    }

    view = (index) => {
        const lihatLaporan = this.state.laporan[index].rotiList
        this.setState({
            laporanView: lihatLaporan
        })
    }

    componentDidMount() {
        this.fetchLaporan()
        this.fetchCountPembelian()
        this.fetchCountTotal()

        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        let arrMonth = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]

        this.setState({
            bulan: arrMonth[month],
            tahun: year
        })
    }
    
    render() {
        console.log(this.state.laporanView);
        return (
            <>
                <div>
                    <div className="">
                        <div className="page-title">
                            <div className="title_left">
                                <h3>Beranda</h3>
                            </div>
                            <div className="title_right">
                                <h3><b>{this.state.bulan}&nbsp;&nbsp;{this.state.tahun}</b></h3>
                            </div>
                        </div>
                        <div className="clearfix" />
                        <div className="row top_tiles">
                            <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div className="background tile-stats">
                                    <div className="icon"><i className="fa fa-check" /></div>
                                    <div className="count">Status</div>
                                    <h3>{this.props.userLogin.role}</h3>
                                </div>
                            </div>
                            <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div className="tile-stats">
                                    <div className="icon"><i className="fa fa-bread" /></div>
                                    <div className="count">{this.state.count}</div>
                                    <h3>Jumlah Roti</h3>
                                </div>
                            </div>
                            <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div className="tile-stats">
                                    <div className="icon"><i className="fa fa-money" /></div>
                                    <div className="count">Rp. {this.state.jumlah}</div>
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
                                                <th><center>ID Laporan</center></th>
                                                <th><center>Jumlah Beli</center></th>
                                                <th><center>Tanggal Beli</center></th>
                                                <th><center>Total</center></th>
                                                <th><center>Action</center></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.laporan.map((laporan, index) => {
                                                    return (
                                                        <>
                                                            <tr align="center">
                                                                <td>{index + 1}</td>
                                                                <td>{laporan.idLaporan}</td>
                                                                <td>{laporan.jumlahKuantitas}</td>
                                                                <td>{laporan.tglBeli}</td>
                                                                <td>Rp. {laporan.jumlahPembayaran}</td>
                                                                <td>
                                                                    <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Rincian Pembelian" onClick={() => this.view(index)}><i className="fa fa-file-text-o" /></button>
                                                                </td>
                                                            </tr>
                                                        </>
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

                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Rincian Pembelian</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th><center>Gambar</center></th>
                                            <th><center>Nama Roti</center></th>
                                            <th><center>Harga</center></th>
                                            <th><center>Kuantitas</center></th>
                                            <th><center>Total Harga</center></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.laporanView.map((laporan, index) => {
                                                return (
                                                    <>
                                                        <tr align="center">
                                                            <td>
                                                                <img src={rotiGambar} alt="..." className="keranjang-img" />
                                                            </td>
                                                            <td>{laporan.namaRoti}</td>
                                                            <td>{laporan.harga}</td>
                                                            <td>{laporan.kuantitas}</td>
                                                            <td>Rp. {laporan.totalHarga}</td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
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