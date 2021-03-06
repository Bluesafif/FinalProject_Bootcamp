import React, { Component } from 'react';
import { Button, Input, Label, Textarea } from '../../component';

class AddAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: "",
            namaLengkap: "",
            username: "",
            nomorTelepon: "",
            email: "",
            alamat: ""
        }
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    doTambahAdmin = () => {
        let obj = this.state;

        if (
            obj.idUser === "" || obj.namaLengkap === "" ||
            obj.username === "" || obj.nomorTelepon === "" ||
            obj.email === "" || obj.alamat === ""
        ) {
            alert("Semua Data wajib diisi");
        } else if (obj.idUser.length > 10) {
            alert("ID User terlalu panjang. Maksimal 10 karakter")
        } else if (obj.namaLengkap.length > 50) {
            alert("Nama Lengkap terlalu panjang. Maksimal 50 karakter")
        } else {
            const objekAdd = {
                idUser: this.state.idUser,
                namaLengkap: this.state.namaLengkap,
                username: this.state.username,
                nomorTelepon: this.state.nomorTelepon,
                email: this.state.email,
                alamat: this.state.alamat
            };
            if (window.confirm("Apakah form sudah terisi dengan benar?")) {
                fetch("http://localhost:8080/roti/master/save-admin", {
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
                        } else if (typeof json.successMessage !== "undefined") {
                            alert(json.successMessage);
                            this.props.history.push("/admin-pengguna");
                        }
                    })
                    .catch((e) => {
                        window.alert(e);
                    });
            }
        }
    };

    reset = () => {
        this.setState({
            idUser: "",
            namaLengkap: "",
            username: "",
            nomorTelepon: "",
            email: "",
            alamat: ""
        })
    }

    render() {
        return (
            <div className>
                <div className="page-title">
                    <div className="title_left">
                        <h3>Tambah Admin</h3>
                    </div>
                </div>
                <div className="clearfix" />
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Form Tambah Admin</h2>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <div className="form-horizontal form-label-left">
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">ID Pengguna <span className="required">*</span></Label>
                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <Input type="text" name="idUser" className="form-control" required="required" value={this.state.idUser} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Nama Lengkap <span className="required">*</span></Label>
                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <Input type="text" name="namaLengkap" className="form-control" required="required" value={this.state.namaLengkap} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Nama Pengguna <span className="required">*</span></Label>
                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <Input type="text" name="username" className="form-control" required="required" value={this.state.username} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Nomor Telepon <span className="required">*</span></Label>
                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <Input type="tel" name="nomorTelepon" className="form-control" required="required" value={this.state.nomorTelepon} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Surel <span className="required">*</span></Label>
                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <Input type="email" name="email" className="form-control" required="required" value={this.state.email} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Alamat <span className="required">*</span></Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Textarea type="text" name="alamat" className="form-control" required="required" value={this.state.alamat} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="ln_solid" />
                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-3">
                                            <Button type="reset" className="btn btn-default" onClick={this.reset}>Reset</Button>
                                            <Button type="submit" className="btn btn-success" name="edit" onClick={this.doTambahAdmin}>Simpan</Button>
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

export default AddAdmin;