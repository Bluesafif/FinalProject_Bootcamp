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
                                    <th rowSpan="2">No</th>
                                    <th rowSpan="2">Nama Pembeli</th>
                                    <th rowSpan="2">Jumlah Beli</th>
                                    <th rowSpan="2">Tanggal Beli</th>
                                    <th colSpan="4">Roti</th>
                                    <th rowSpan="2">Biaya</th>
                                    <th rowSpan="2">Diskon</th>
                                    <th rowSpan="2">Total</th>
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
                                                    <td>{index + 1}</td>
                                                    <td>{laporan.namaLengkap}</td>
                                                    <td>{laporan.jumlahKuantitas}</td>
                                                    <td>{laporan.tglBeli}</td>
                                                    <td>
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
                                                    <td>
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
                                                    <td>
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
                                                    <td>
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
                                                    <td>Rp. {this.formatRupiah(laporan.jumlahTotal)}</td>
                                                    <td>Rp. {this.formatRupiah(laporan.diskon)}</td>
                                                    <td>Rp. {this.formatRupiah(laporan.jumlahPembayaran)}</td>
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