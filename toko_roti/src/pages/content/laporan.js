import React, { Component } from 'react';
import { Input, Button, Select, Option } from '../../component';
import rotiGambar from '../../assets/roti.jpg'
import Pagination from '@material-ui/lab/Pagination';
import ReactToPrint from 'react-to-print';
import PrintLaporan from '../laporan/printLaporan.js';
import formatRupiah from '../../util/rupiah.js'

class LaporanContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            laporan: [],
            laporanView: [],
            bulan: 0,
            tahun: 0,
            page: 1,
            pageNew: 1,
            limit: 5,
            count: 0,
            pilihanBulan: [
                {
                  bulan: 1,
                  namaBulan: "Januari",
                },
                {
                  bulan: 2,
                  namaBulan: "Februari",
                },
                {
                  bulan: 3,
                  namaBulan: "Maret",
                },
                {
                  bulan: 4,
                  namaBulan: "April",
                },
                {
                  bulan: 5,
                  namaBulan: "Mei",
                },
                {
                  bulan: 6,
                  namaBulan: "Juni",
                },
                {
                  bulan: 7,
                  namaBulan: "Juli",
                },
                {
                  bulan: 8,
                  namaBulan: "Agustus",
                },
                {
                  bulan: 9,
                  namaBulan: "September",
                },
                {
                  bulan: 10,
                  namaBulan: "Oktober",
                },
                {
                  bulan: 11,
                  namaBulan: "November",
                },
                {
                  bulan: 12,
                  namaBulan: "Desember",
                },
            ],
            pilihanTahun: [],
            namaPembeli: "",
            namaRoti: "",
            laporanPrint: []
        }
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    handleChange = (event, value) => {
        this.setState({
            page: value
        })
        let date = new Date()
        let bulan = date.getMonth()
        let year = date.getFullYear();
        if (this.state.bulan === bulan && this.state.tahun === year && this.state.namaPembeli === "" && this.state.namaRoti === "") {
            this.fetchLaporan(value, 5);
        } else {
            this.fetchLaporanMonth(value, 5)
        }
    }

    fetchLaporan = (page, limit) => {
        this.getCount()
        if (page === undefined) {
            page = 1
        }
        fetch(`http://localhost:8080/roti/laporanadmin?limit=` + this.state.limit + `&page=` + page + ``, {
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
                this.fetchLaporanPrint()
            })
            .catch(() => {
            })
    }

    fetchLaporanMonth = (page, limit) => {
        this.getCountMonth()
        fetch(`http://localhost:8080/roti/laporanadminmonth?limit=` + limit + `&page=` + page + `&bulan=` + this.state.bulan + `&tahun=` + this.state.tahun + `&namaPembeli=` + this.state.namaPembeli + `&namaRoti=` + this.state.namaRoti + ``, {
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
                this.fetchLaporanPrint()
            })
            .catch(() => {
            })
    }

    fetchLaporanPrint = () => {
        fetch(`http://localhost:8080/roti/laporanadminprint?bulan=` + this.state.bulan + `&tahun=` + this.state.tahun + `&namaPembeli=` + this.state.namaPembeli + `&namaRoti=` + this.state.namaRoti + ``, {
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
                    laporanPrint: json,
                });
            })
            .catch(() => {
            })
    }

    getCount = () => {
        fetch('http://localhost:8080/roti/laporanall-count', {
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
                    count: Math.ceil(Number(json) / this.state.limit)
                });
            })
            .catch((e) => {
                alert(e);
            });
    }

    getCountMonth = () => {
        fetch(`http://localhost:8080/roti/laporanallmonth-count?bulan=`+this.state.bulan+`&tahun=`+this.state.tahun + `&namaPembeli=` + this.state.namaPembeli + `&namaRoti=` + this.state.namaRoti + ``, {
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
                    count: Math.ceil(Number(json) / this.state.limit)
                });
            })
            .catch((e) => {
                alert(e);
            });
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

        for (let i = 2010; i <= year; i++) {
            this.state.pilihanTahun.push(i);
        }

        this.setState({
            bulan: month+1,
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
                                        <div className="float-right">
                                            <ReactToPrint
                                                trigger={() => {
                                                    return <Button className="btn btn-primary"><i className="fa fa-print" aria-hidden="true"></i></Button>;
                                                }}
                                                content={() => this.componentRef}
                                            />
                                            <div className="clearfix" />
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="x_content">
                                        <div className="col-md-12 col-sm-5">
                                            <div className="input-group">
                                                <Select className="form-control" value={this.state.bulan} onChange={this.setValue} name="bulan">
                                                    {this.state.pilihanBulan.map((Item, idx) => (
                                                        <Option value={Item.bulan} key={idx}>{Item.namaBulan}</Option>
                                                    ))}
                                                </Select> &nbsp; &nbsp;
                                                <Select className="form-control" value={this.state.tahun} onChange={this.setValue} name="tahun">
                                                    {this.state.pilihanTahun.map((Item, idx) => (
                                                        <Option value={Item} key={idx}>{Item}</Option>
                                                    ))}
                                                </Select> &nbsp; &nbsp;
                                                <Input type="search" className="form-control" placeholder="Nama Pembeli" onChange={this.setValue} value={this.state.namaPembeli} name="namaPembeli"/> &nbsp; &nbsp;
                                                <Input type="search" className="form-control" placeholder="Nama Roti" onChange={this.setValue} value={this.state.namaRoti} name="namaRoti"/>
                                                <span className="input-group-btn">
                                                    <Button className="text-white btn btn-primary" onClick={() => this.fetchLaporanMonth(this.state.page, this.state.limit)}>
                                                        <i className="fa fa-search" aria-hidden="true"></i>
                                                    </Button>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                            <table className="table table-striped jambo_table bulk_action">
                                                <thead>
                                                    <tr align="center" className="headings">
                                                        <th>No</th>
                                                        <th>Nama Pembeli</th>
                                                        <th>Jumlah Beli</th>
                                                        <th>Tanggal Beli</th>
                                                        <th>Biaya</th>
                                                        <th>Diskon</th>
                                                        <th>Total</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.laporan.map((laporan, index) => {
                                                            return (
                                                                <>
                                                                    <tr align="center">
                                                                        <td style={{verticalAlign: "middle"}}>{(5*(this.state.page - 1)+(index + 1))}</td>
                                                                        <td style={{verticalAlign: "middle"}}>{laporan.namaLengkap}</td>
                                                                        <td style={{verticalAlign: "middle"}}>{laporan.jumlahKuantitas}</td>
                                                                        <td style={{verticalAlign: "middle"}}>{laporan.tglBeli}</td>
                                                                        <td style={{verticalAlign: "middle"}}>{formatRupiah(laporan.jumlahTotal)}</td>
                                                                        <td style={{verticalAlign: "middle"}}>{formatRupiah(laporan.diskon)}</td>
                                                                        <td style={{verticalAlign: "middle"}}>{formatRupiah(laporan.jumlahPembayaran)}</td>
                                                                        <td style={{verticalAlign: "middle"}}>
                                                                            <button data-toggle="modal" data-target="#exampleModal" className="text-white btn btn-secondary" title="Rincian Pembelian" onClick={() => this.view(index)}><i className="fas fa-file-alt" /></button>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="pagination float-right">
                                            <Pagination count={this.state.count} page={this.state.page} onChange={this.handleChange} />
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
                                <table className="table table-striped jambo_table bulk_action">
                                    <thead>
                                        <tr align="center" className="headings">
                                            <th style={{verticalAlign: "middle"}}>Gambar</th>
                                            <th style={{verticalAlign: "middle"}}>Nama Roti</th>
                                            <th style={{verticalAlign: "middle"}}>Harga</th>
                                            <th style={{verticalAlign: "middle"}}>Kuantitas</th>
                                            <th style={{verticalAlign: "middle"}}>Total Harga</th>
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
                                                            <td style={{verticalAlign: "middle"}}>{formatRupiah(laporan.harga)}</td>
                                                            <td style={{verticalAlign: "middle"}}>{laporan.kuantitas}</td>
                                                            <td style={{verticalAlign: "middle"}}>{formatRupiah(laporan.totalHarga)}</td>
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
                
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Print</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <PrintLaporan ref={el => (this.componentRef = el)} printLaporan={this.state.laporanPrint} detail={this.state.laporanView}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LaporanContent;