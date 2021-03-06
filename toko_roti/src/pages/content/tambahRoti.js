import React, { Component } from 'react';
import { Button, Input, Label, Textarea, Select, Option } from '../../component';

class AddRoti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idRoti: "",
            namaRoti: "",
            idJenisRoti: "",
            stokRoti: "",
            hargaSatuan: "",
            hargaLusin: "",
            keterangan: "",
            image: null,
            jenisRoti: []
        }
    }
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    doTambahRoti = () => {
        let obj = this.state;

        if (
            obj.idRoti === "" || obj.namaRoti === "" ||
            obj.jenisRoti === "" || obj.stokRoti === "" ||
            obj.hargaSatuan === "" || obj.hargaLusin === ""
        ) {
            alert("Semua data wajib diisi");
        } else if (obj.idRoti.length > 10) {
            alert("ID Roti terlalu panjang. Maksimal 10 karakter")
        } else if (obj.namaRoti.length > 50) {
            alert("Nama Roti terlalu panjang. Maksimal 50 karakter")
        } else {
            const objekAdd = {
                idRoti: this.state.idRoti,
                namaRoti: this.state.namaRoti,
                idJenisRoti: this.state.idJenisRoti,
                stokRoti: this.state.stokRoti,
                hargaSatuan: this.state.hargaSatuan,
                hargaLusin: this.state.hargaLusin,
                keterangan: this.state.keterangan,
                gambarRoti: this.state.image
            };
            if (window.confirm("Apakah form sudah terisi dengan benar?")) {
                fetch("http://localhost:8080/roti/master/save-roti", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; ; charset=utf-8",
                        "Access-Control-Allow-Headers": "Authorization, Content-Type",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify(objekAdd),
                })
                    .then((response) => response.json())
                    .then((json) => {
                        if (typeof json.successMessage !== "undefined") {
                            alert(json.successMessage);
                            this.props.history.push("/admin-roti");
                        } else if (typeof json.errorMessage !== "undefined") {
                            alert(json.errorMessage);
                        }
                    })
                    .catch((e) => {
                        window.alert(e);
                    });
            }
        }
    };

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

    reset = () => {
        this.setState({
            idRoti: "",
            namaRoti: "",
            idJenisRoti: "",
            stokRoti: "",
            hargaSatuan: "",
            hargaLusin: "",
            keterangan: ""
        })
    }

    componentDidMount() {
        this.fetchJenis()
    }
    render() {
        return (
            <div className>
                <div className="page-title">
                    <div className="title_left">
                        <h3>Tambah Roti</h3>
                    </div>
                </div>
                <div className="clearfix" />
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Form Tambah Roti</h2>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <div className="form-horizontal form-label-left" encType="multipart/form-data">
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">ID Roti <span className="required">*</span></Label>
                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <Input type="text" name="idRoti" className="form-control" required="required" value={this.state.idRoti} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Nama Roti <span className="required">*</span></Label>
                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <Input type="text" name="namaRoti" className="form-control" required="required" value={this.state.namaRoti} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Jenis Roti <span className="required">*</span></Label>
                                        <div className="col-md-3 col-sm-6 col-xs-12">
                                            <Select className="form-control" value={this.state.idJenisRoti} onChange={this.setValue} name="idJenisRoti">
                                                <Option value="">-- Pilih Jenis Roti--</Option>
                                                {this.state.jenisRoti.map((Item, idx) => (
                                                    <Option value={Item.idJenisRoti} key={idx}>{Item.jenisRoti}</Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Stok Roti <span className="required">*</span></Label>
                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <Input type="number" name="stokRoti" className="form-control" required="required" value={this.state.stokRoti} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Harga Satuan <span className="required">*</span></Label>
                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <Input type="number" name="hargaSatuan" className="form-control" required="required" value={this.state.hargaSatuan} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Harga Lusinan <span className="required">*</span></Label>
                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <Input type="number" name="hargaLusin" className="form-control" required="required" value={this.state.hargaLusin} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Keterangan</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Textarea type="text" name="keterangan" className="form-control" value={this.state.keterangan} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="ln_solid" />
                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-3">
                                            <Button type="reset" className="btn btn-default" onClick={this.reset}>Reset</Button>
                                            <Button type="submit" className="btn btn-success" name="edit" onClick={this.doTambahRoti}>Simpan</Button>
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

export default AddRoti;