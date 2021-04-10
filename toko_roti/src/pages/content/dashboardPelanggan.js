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
                } else if (typeof json.successMessage !== "undefined") {
                    alert(
                        json.successMessage
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
                                    <div className="icon"><i className="fas fa-bread-slice" /></div>
                                    <div className="count">{this.state.count}</div>
                                    <h3>Jumlah Roti</h3>
                                </div>
                            </div>
                            <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div className="tile-stats">
                                    <div className="icon"><i className="glyphicon glyphicon-usd" /></div>
                                    <div className="count">Rp. {this.formatRupiah(this.state.jumlah)}</div>
                                    <h3>Biaya Pengeluaran</h3>
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
                                    <table className="table table-striped jambo_table bulk_action">
                                        <thead>
                                            <tr className="headings" align="center">
                                                <th>No</th>
                                                <th>ID Laporan</th>
                                                <th>Jumlah Beli</th>
                                                <th>Tanggal Beli</th>
                                                <th>Total</th>
                                                <th>Action</th>
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
                                                                    <td style={{verticalAlign: "middle"}}>{(5*(this.state.page - 1)+(index + 1))}</td>
                                                                    <td style={{verticalAlign: "middle"}}>{laporan.idLaporan}</td>
                                                                    <td style={{verticalAlign: "middle"}}>{laporan.jumlahKuantitas}</td>
                                                                    <td style={{verticalAlign: "middle"}}>{laporan.tglBeli}</td>
                                                                    <td style={{verticalAlign: "middle"}}>Rp. {this.formatRupiah(laporan.jumlahPembayaran)}</td>
                                                                    <td style={{verticalAlign: "middle", padding:"0.5rem"}}>
                                                                        <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Rincian Pembelian" onClick={() => this.view(index)}><i className="fas fa-file-alt" /></button>
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
                                        <tr align="center">
                                            <th>Gambar</th>
                                            <th>Nama Roti</th>
                                            <th>Harga</th>
                                            <th>Kuantitas</th>
                                            <th>Total Harga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.laporanView.map((laporan, index) => {
                                                return (
                                                    <>
                                                        <tr align="center">
                                                            <td style={{verticalAlign: "middle"}}>
                                                                <img src={rotiGambar} alt="..." className="keranjang-img" />
                                                            </td>
                                                            <td style={{verticalAlign: "middle"}}>{laporan.namaRoti}</td>
                                                            <td style={{verticalAlign: "middle"}}>{laporan.harga}</td>
                                                            <td style={{verticalAlign: "middle"}}>{laporan.kuantitas}</td>
                                                            <td style={{verticalAlign: "middle"}}>Rp. {laporan.totalHarga}</td>
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