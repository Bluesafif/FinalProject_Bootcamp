import React, { Component } from 'react';
import { Button, Input, Label, Textarea } from '../../component';

class UbahRoti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rotiUbah: {},
            namaRoti: "",
            idJenisRoti: "",
            stokRoti: "",
            hargaSatuan: "",
            hargaLusin: "",
            keterangan: "",
            jenisRoti:[],
            operator: "tambah",
            tambahRoti: ""
        }
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    componentDidMount() {
        fetch(`http://localhost:8080/roti/master/oneroti/?idRoti=${this.props.match.params.idRoti}`, {
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
                    rotiUbah: json
                });
                this.setState({
                    namaRoti: this.state.rotiUbah.namaRoti,
                    idJenisRoti: this.state.rotiUbah.idJenisRoti,
                    stokRoti: this.state.rotiUbah.stokRoti,
                    hargaSatuan: this.state.rotiUbah.hargaSatuan,
                    hargaLusin: this.state.rotiUbah.hargaLusin,
                    keterangan: this.state.rotiUbah.keterangan
                })
                if (typeof json.errorMessage !== 'undefined') {

                }
            })
            .catch((e) => {
                console.log(e);

            });
        this.fetchJenis()
    }

    fetchJenis = () => {
        fetch(`http://localhost:8080/roti/master/jenis`, {
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
                    jenisRoti: json,
                });
            })
            .catch(() => {
                alert("failed fetching data");
            });
    };

    saveUbah = () => {
        let stokUbah

        if (this.state.operator === "tambah") {
            stokUbah = this.state.stokRoti + Number(this.state.tambahRoti);
        } else {
            if (Number(this.state.tambahRoti > 0)) {
                if (this.state.stokRoti >= Number(this.state.tambahRoti)) {
                    stokUbah = this.state.stokRoti - Number(this.state.tambahRoti);
                } else {
                    stokUbah = this.state.stokRoti
                    alert("Input Roti Tidak Boleh Lebih Besar Dari Stok Roti")
                }
            } else {
                stokUbah = this.state.stokRoti
                alert("Input Roti Tidak Boleh Kurang dari 0")
            }
        }

        const objekUbah = {
            namaRoti: this.state.namaRoti,
            idJenisRoti: this.state.idJenisRoti,
            stokRoti: stokUbah,
            hargaSatuan: this.state.hargaSatuan,
            hargaLusin: this.state.hargaLusin,
            keterangan: this.state.keterangan
        };

        fetch(`http://localhost:8080/roti/master/roti/${this.props.match.params.idRoti}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; ; charset=utf-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(objekUbah)
        })
            .then((response) => response.json())
            .then(json => {
                if (typeof json.errorMessage !== "undefined") {
                    alert(json.errorMessage);
                } else if (typeof json.errorMessage === "undefined") {
                    alert(
                        json.errorMessage
                    );
                }
                this.props.history.push("/admin-roti")
            })
            .catch((e) => {
                window.alert(e);
            });
            
        }

    render() {
        return (
            <div className>
                <div className="page-title">
                    <div className="title_left">
                        <h3>Edit Roti</h3>
                    </div>
                </div>
                <div className="clearfix" />
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Form Edit Roti</h2>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <div className="form-horizontal form-label-left" encType="multipart/form-data">
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">ID Roti</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="text" name="idRoti" className="form-control col-md-7 col-xs-12" required="required" disabled="disabled" value={this.state.rotiUbah.idRoti} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Nama Roti</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="text" name="namaRoti" className="form-control col-md-7 col-xs-12" required="required" value={this.state.namaRoti} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Jenis Roti</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <select className="form-control col-md-5 col-xs-12" value={this.state.idJenisRoti} onChange={this.setValue} name="idJenisRoti">
                                                <option value="">-- Pilih Jenis Roti--</option>
                                                {this.state.jenisRoti.map((Item, idx) => (
                                                    <option value={Item.idJenisRoti} key={idx}>{Item.jenisRoti}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Stok Roti</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="number" name="stokRoti" className="form-control col-md-2 col-xs-12" required="required" disabled="disabled" value={this.state.stokRoti} />
                                            <select className="form-control col-md-2 col-xs-12" value={this.state.operator} onChange={this.setValue} name="operator">
                                                <option value="tambah">+</option>
                                                <option value="kurang">-</option>
                                            </select>
                                            <Input type="number" name="tambahRoti" min="0" className="form-control col-md-2 col-xs-12" required="required" value={this.state.tambahRoti} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Harga Satuan</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="number" name="hargaSatuan" className="form-control col-md-7 col-xs-12" required="required" value={this.state.hargaSatuan} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Harga Lusinan</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="number" name="hargaLusin" className="form-control col-md-7 col-xs-12" required="required" value={this.state.hargaLusin} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Keterangan</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Textarea type="text" name="keterangan" className="form-control col-md-7 col-xs-12" required="required" value={this.state.keterangan} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="ln_solid" />
                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-3">
                                            <Button type="reset" className="btn btn-default">Reset</Button>
                                            <Button type="submit" className="btn btn-success" name="edit" onClick={this.saveUbah}>Simpan</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default UbahRoti;