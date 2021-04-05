import React, { Component } from 'react';
import { Button, Input, Label, Textarea } from '../../component';

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
            jenisRoti:[]
        }
        this.onImageChange = this.onImageChange.bind(this);
    }
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };

    doTambahRoti = () => {
        let obj = this.state;

        if (
            obj.idRoti === "" || obj.namaRoti === "" ||
            obj.jenisRoti === "" || obj.stokRoti === "" ||
            obj.hargaSatuan === "" || obj.hargaLusin === "" ||
            obj.keterangan === ""
        ) {
            alert("Semua data wajib diisi");
        }else if(obj.idRoti.length > 10){
            alert("ID Roti terlalu panjang. Maksimal 10 karakter")
        }else if(obj.namaRoti.length > 50){
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
                        alert(
                            json.errorMessage
                        );
                    }
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