import React, { Component } from 'react';
import { Button, Input, Label, Textarea } from '../../component';

class UbahPenggunaPel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfil: {},
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

    componentDidMount() {
        fetch(`http://localhost:8080/roti/master/profil/?idUser=${this.props.match.params.idUser}`, {
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
                    userProfil: json
                });
                this.setState({
                    namaLengkap: this.state.userProfil.namaLengkap,
                    username: this.state.userProfil.username,
                    nomorTelepon: this.state.userProfil.nomorTelepon,
                    email: this.state.userProfil.email,
                    alamat: this.state.userProfil.alamat
                })
                if (typeof json.errorMessage !== 'undefined') {

                }
            })
            .catch((e) => {
                console.log(e);

            });
    }

    saveUbah = () => {
        let obj = this.state
        if (
            obj.namaLengkap === "" || obj.username === "" ||
            obj.nomorTelepon === "" || obj.email === "" ||
            obj.alamat === ""
        ) {
            alert("Semua data wajib diisi");
        } else if (obj.namaLengkap.length > 50) {
            alert("Nama Lengkap terlalu panjang, maksimal 50 karakter.")
        } else {
        const objekUbah = {
            namaLengkap: this.state.namaLengkap,
            username: this.state.username,
            nomorTelepon: this.state.nomorTelepon,
            email: this.state.email,
            alamat: this.state.alamat
        };

        fetch(`http://localhost:8080/roti/master/user/${this.props.match.params.idUser}`, {
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
                } else if (typeof json.successMessage !== "undefined") {
                    alert(
                        json.successMessage
                    );
                    this.props.history.push("/data-pelanggan")
                }
            })
            .catch((e) => {
                window.alert(e);
            });
        }
    }

    reset = () => {
        this.setState({
            namaLengkap: this.state.userProfil.namaLengkap,
            username: this.state.userProfil.username,
            nomorTelepon: this.state.userProfil.nomorTelepon,
            email: this.state.userProfil.email,
            alamat: this.state.userProfil.alamat
        })
    }

    render() {
        return (
            <div className>
                <div className="page-title">
                    <div className="title_left">
                        <h3>Edit Profil</h3>
                    </div>
                </div>
                <div className="clearfix" />
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Form Edit Profil</h2>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <div className="form-horizontal form-label-left" encType="multipart/form-data">
                                    <div className="item form-group">
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">ID Pengguna</Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="text" name="idUser" className="form-control col-md-7 col-xs-12" required="required" value={this.state.userProfil.idUser} disabled="disabled" />
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
                                            <Button type="reset" className="btn btn-default" onClick={this.reset}>Reset</Button>
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

export default UbahPenggunaPel;