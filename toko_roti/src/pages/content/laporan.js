import React, { Component } from 'react';
import { Input } from '../../component';
import rotiGambar from '../../assets/roti.jpg'

class LaporanContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            laporan: [],
            laporanView: [],
            bulan: 0,
            tahun: 0
        }
    }

    fetchLaporan = () => {
        fetch(`http://localhost:8080/roti/laporanadmin`, {
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

    view = (index) => {
        const lihatLaporan = this.state.laporan[index].rotiList
        this.setState({
            laporanView: lihatLaporan
        })
    }

    componentDidMount() {
        this.fetchLaporan()

        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        let arrMonth = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

        this.setState({
            bulan: arrMonth[month],
            tahun: year
        })
    }

    render() {
        return (
            <>
                <div>
                    <div className="">
                        <div className="page-title">
                            <div className="title_left">
                                <h3>Laporan</h3>
                            </div>
                        </div>
                        <div className="clearfix" />
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="x_panel">
                                    <div className="x_title">
                                        <h2>Data Laporan</h2>
                                        <div className="title_right">
                                            <h3><b>{this.state.bulan}&nbsp;&nbsp;{this.state.tahun}</b></h3>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="input-group">
                                                <h3>&nbsp;Pencarian Laporan :&nbsp;&nbsp;</h3>
                                                <Input type="text" className="form-control" placeholder="Cari..." />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="x_content">
                                        <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                            <table id="surat_masuk" className="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th><center>No</center></th>
                                                        <th><center>Nama Pembeli</center></th>
                                                        <th><center>Jumlah Beli</center></th>
                                                        <th><center>Tanggal Beli</center></th>
                                                        <th><center>Biaya</center></th>
                                                        <th><center>Diskon</center></th>
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
                                                                        <td>{laporan.namaLengkap}</td>
                                                                        <td>{laporan.jumlahKuantitas}</td>
                                                                        <td>{laporan.tglBeli}</td>
                                                                        <td>Rp. {laporan.jumlahTotal}</td>
                                                                        <td>Rp. {laporan.diskon}</td>
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

export default LaporanContent;