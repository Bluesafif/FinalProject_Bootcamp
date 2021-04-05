import React, { Component } from 'react';
import { connect } from 'react-redux';
import rotiGambar from '../../assets/roti.jpg'
import Pagination from '@material-ui/lab/Pagination';

class DashboardPelanggan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            laporan: [],
            laporanView: [],
            bulan: 0,
            tahun: 0,
            count: 0,
            jumlah: 0,
            page: 1,
            limit: 5,
            hal: 0,
            userProfil: {}
        }
    }

    getProfil = () => {
        fetch(`http://localhost:8080/roti/master/profil/?idUser=${this.props.userLogin.idUser}`, {
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
                if (this.state.userProfil.role === "Umum") {
                    if (this.state.jumlah >= 500000 || this.state.count >= 100) {
                        this.upgrade()
                    }
                } else if (this.state.userProfil.role === "Member") {
                    let date = new Date()
                    if (this.state.laporan[0].tglBeli - date >= 14) {
                        this.downgrade()
                    }
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    handleChange = (event, value) => {
        this.setState({
            page: value
        })
        this.fetchLaporan(value, 3);
    }

    fetchLaporan = (page, limit) => {
        if (page === undefined) {
            page = 1
        }
        fetch(`http://localhost:8080/roti/laporancustomer/?idUser=${encodeURIComponent(this.props.userLogin.idUser)}&limit=` + this.state.limit + `&page=` + page + ``, {
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

    getCount = () => {
        fetch(`http://localhost:8080/roti/laporancustomer-count?idUser=${encodeURIComponent(this.props.userLogin.idUser)}`, {
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
                    hal: Math.ceil(Number(json) / this.state.limit)
                });
            })
            .catch((e) => {
                alert(e);
            });
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
                    count: Number(json),
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
                    jumlah: Number(json),
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

    upgrade = () => {
        fetch(`http://localhost:8080/roti/master/status-member?idUser=${encodeURIComponent(this.props.userLogin.idUser)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((response) => response.json())
            .then((json) => {
                if (typeof json.errorMessage !== "undefined") {
                    alert(json.errorMessage);
                } else if (typeof json.errorMessage === "undefined") {
                    alert(
                        json.errorMessage
                    );
                    window.location.reload()
                }
            })
            .catch(() => {
            })
    }

    componentDidMount() {
        this.getProfil()
        this.fetchLaporan()
        this.fetchCountPembelian()
        this.fetchCountTotal()
        this.getCount()

        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        let arrMonth = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

        this.setState({
            bulan: arrMonth[month],
            tahun: year
        })
    }

    formatRupiah = (bilangan) => {
        var reverse = bilangan.toString().split("").reverse().join(""),
          ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join(".").split("").reverse().join("");
        return ribuan;
    };

    render() {
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
                                    { this.state.userProfil.role === "Member"
                                        ? <div className="icon"><i className="fa fa-check blue" /></div>
                                        : <div className="icon"><i className="fa fa-check" /></div>
                                    }
                                    <div className="count">Status</div>
                                    <h3>{this.state.userProfil.role}</h3>
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
                                    <div className="count">Rp. {this.formatRupiah(this.state.jumlah)}</div>
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
                                        { this.state.laporan.length === 0
                                        ?
                                            <tbody>
                                                <tr align="center">
                                                    <td colSpan="6">Belum ada pembelian di bulan {this.state.bulan}&nbsp;{this.state.tahun}</td>
                                                </tr>
                                            </tbody>
                                        :
                                            <tbody>
                                                {
                                                    this.state.laporan.map((laporan, index) => {
                                                        return (
                                                            <>
                                                                <tr align="center">
                                                                    <td>{(5*(this.state.page - 1)+(index + 1))}</td>
                                                                    <td>{laporan.idLaporan}</td>
                                                                    <td>{laporan.jumlahKuantitas}</td>
                                                                    <td>{laporan.tglBeli}</td>
                                                                    <td>Rp. {this.formatRupiah(laporan.jumlahPembayaran)}</td>
                                                                    <td>
                                                                        <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Rincian Pembelian" onClick={() => this.view(index)}><i className="fa fa-file-text-o" /></button>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        }
                                    </table>
                                </div>
                                <div className="pagination float-right">
                                    {/* <Typography>Page: {page}</Typography> */}
                                    <Pagination count={this.state.hal} page={this.state.page} onChange={this.handleChange} />
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