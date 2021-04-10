import React, { Component } from 'react';
import headerLaporan from '../../assets/header_laporan.png'

class PrintLaporan extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
                    <img src={headerLaporan} alt="..."></img>
                    <div>
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr align="center">
                                    <th rowSpan="2" style={{verticalAlign: "middle"}}>No</th>
                                    <th rowSpan="2" style={{verticalAlign: "middle"}}>Nama Pembeli</th>
                                    <th rowSpan="2" style={{verticalAlign: "middle"}}>Jumlah Beli</th>
                                    <th rowSpan="2" style={{verticalAlign: "middle"}}>Tanggal Beli</th>
                                    <th colSpan="4">Roti</th>
                                    <th rowSpan="2" style={{verticalAlign: "middle"}}>Biaya</th>
                                    <th rowSpan="2" style={{verticalAlign: "middle"}}>Diskon</th>
                                    <th rowSpan="2" style={{verticalAlign: "middle"}}>Total</th>
                                </tr>
                                <tr align="center">
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Kuantitas</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.printLaporan.map((laporan, index) => {
                                        return (
                                            <>
                                                <tr align="center" key={index}>
                                                    <td style={{verticalAlign: "middle"}}>{index + 1}</td>
                                                    <td style={{verticalAlign: "middle"}}>{laporan.namaLengkap}</td>
                                                    <td style={{verticalAlign: "middle"}}>{laporan.jumlahKuantitas}</td>
                                                    <td style={{verticalAlign: "middle"}}>{laporan.tglBeli}</td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                    {
                                                        laporan.rotiList.map((detail, i) => {
                                                            return (
                                                                <tr>
                                                                    {detail.namaRoti}
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                    {
                                                        laporan.rotiList.map((detail, i) => {
                                                            return (
                                                                <tr>
                                                                    Rp. {this.formatRupiah(detail.harga)}
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                    {
                                                        laporan.rotiList.map((detail, i) => {
                                                            return (
                                                                <tr>
                                                                    {detail.kuantitas}
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                    {
                                                        laporan.rotiList.map((detail, i) => {
                                                            return (
                                                                <tr>
                                                                    Rp. {this.formatRupiah(detail.totalHarga)}
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>Rp. {this.formatRupiah(laporan.jumlahTotal)}</td>
                                                    <td style={{verticalAlign: "middle"}}>Rp. {this.formatRupiah(laporan.diskon)}</td>
                                                    <td style={{verticalAlign: "middle"}}>Rp. {this.formatRupiah(laporan.jumlahPembayaran)}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default PrintLaporan;