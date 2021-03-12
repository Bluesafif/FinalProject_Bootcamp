import React, { Component } from 'react';
import { Button, Input, Label, Textarea } from '../../component';
import { Link } from 'react-router-dom'

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
        } else {
            const objekAdd = {
                idUser: this.state.idUser,
                namaLengkap: this.state.namaLengkap,
                username: this.state.username,
                nomorTelepon: this.state.nomorTelepon,
                email: this.state.email,
                alamat: this.state.alamat
            };
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
                    } else if (typeof json.errorMessage === "undefined") {
                        alert(
                            json.errorMessage
                        );
                        this.props.history.push("/admin-pengguna");
                    }
                })
                .catch((e) => {
                    window.alert(e);
                });
        }
    };

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
                                <ul className="nav navbar-right panel_toolbox">
                                    <li><Link className="collapse-link"><i className="fa fa-chevron-up" /></Link></li>
                                </ul>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <div className="form-horizontal form-label-left" encType="multipart/form-data">
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">ID Pengguna</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="text" name="idUser" className="form-control col-md-7 col-xs-12" required="required" value={this.state.idUser} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Nama Lengkap</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="text" name="namaLengkap" className="form-control col-md-7 col-xs-12" required="required" value={this.state.namaLengkap} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Nama Pengguna</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="text" name="username" className="form-control col-md-7 col-xs-12" required="required" value={this.state.username} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Nomor Telepon</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="text" name="nomorTelepon" className="form-control col-md-7 col-xs-12" required="required" value={this.state.nomorTelepon} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Surel</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="text" name="email" className="form-control col-md-7 col-xs-12" required="required" value={this.state.email} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Alamat</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Textarea type="text" name="alamat" className="form-control col-md-7 col-xs-12" required="required" value={this.state.alamat} onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <div className="ln_solid" />
                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-3">
                                            <Button type="reset" className="btn btn-default">Reset</Button>
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