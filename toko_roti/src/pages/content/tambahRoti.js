import React, { Component } from 'react';
import { Button, Input, Label, Textarea } from '../../component';
import { Link } from 'react-router-dom'

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
            jenisRoti:[]
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
            obj.hargaSatuan === "" || obj.hargaLusin === "" ||
            obj.keterangan === ""
        ) {
            alert("Semua Data wajib diisi");
        } else {
            const objekAdd = {
                idRoti: this.state.idRoti,
                namaRoti: this.state.namaRoti,
                idJenisRoti: this.state.idJenisRoti,
                stokRoti: this.state.stokRoti,
                hargaSatuan: this.state.hargaSatuan,
                hargaLusin: this.state.hargaLusin,
                keterangan: this.state.keterangan
            };

            console.log(objekAdd);
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
                    if (typeof json.errorMessage !== "undefined") {
                        alert(json.errorMessage);
                    } else if (typeof json.errorMessage === "undefined") {
                        alert(
                            json.errorMessage
                        );
                    }
                    // this.props.history.push("/admin-roti");
                })
                .catch((e) => {
                    window.alert(e);
                });
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

    componentDidMount(){
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
                                <ul className="nav navbar-right panel_toolbox">
                                    <li><Link className="collapse-link"><i className="fa fa-chevron-up" /></Link></li>
                                </ul>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <div className="form-horizontal form-label-left" encType="multipart/form-data">
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">ID Roti</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="text" name="idRoti" className="form-control col-md-7 col-xs-12" required="required" value={this.state.idRoti} onChange={this.setValue} />
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
                                            <Input type="number" name="stokRoti" className="form-control col-md-7 col-xs-12" required="required" value={this.state.stokRoti} onChange={this.setValue} />
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