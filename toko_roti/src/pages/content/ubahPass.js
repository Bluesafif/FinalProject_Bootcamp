import React, { Component } from 'react';
import { Button, Input, Label } from '../../component';
import { connect } from 'react-redux';

class UbahPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password : "",
            passwordUlangi: "",
            userProfil: {}
        }
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    getProfil = () => {
        fetch(`http://localhost:8080/roti/master/profil/?idUser=${encodeURIComponent(this.props.userLogin.idUser)}`, {
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
                if (typeof json.errorMessage !== 'undefined') {

                }
            })
            .catch((e) => {
                console.log(e);

            });
    };

    updatePassword = () => {
        let obj = this.state;
        console.log(obj.password);
        console.log(obj.passwordUlangi);
        if (
            obj.password === "" ||
            obj.passwordUlangi === ""
        ) {
            alert("password baru dan Konfirmasi password baru wajib diisi");
        } else if (obj.password !== obj.passwordUlangi) {
            alert("Password dan Konfirmasi password baru tidak sesuai");
        } else {
            const dataPassword = {
                username: this.props.userLogin.username,
                password: this.state.password,
            };
            fetch("http://localhost:8080/roti/master/changePass", {
                method: "put",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(dataPassword),
            })
                .then((response) => response.json())
                .then((json) => {
                    if (typeof json.errorMessage !== "undefined") {
                        alert(json.errorMessage);
                    } else if (typeof json.errorMessage !== "undefined") {
                        alert(
                            json.errorMessage
                        );
                        this.props.keluar()
                        if (this.props.checkLogin === false) {
                            this.refreshPage()
                        }
                    }
                })
                .catch((e) => {
                });
        }
    };

    componentDidMount() {
        this.getProfil()
    }

    render() {
        return (
            <div className="">
                <div className="page-title">
                    <div className="title_left">
                        <h3>Ganti Password</h3>
                    </div>
                </div>
                <div className="clearfix" />
                <div className="row">
                    <div className="col-md-12 col-sm1-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Form Ganti Password</h2>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <div className="form form-horizontal form-label-left">
                                    <div>
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Username<span className="required"> :</span>
                                        </Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="text" id="username" name="username" required="required" disabled="disabled" className="form-control col-md-7 col-xs-12" value={this.state.userProfil.username} />
                                        </div>
                                    </div><br />
                                    <div>
                                        <br /> <br />
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Password Baru<span className="required"> :</span>
                                        </Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="password" id="pass_baru" name="password" required="required" className="form-control col-md-7 col-xs-12" onChange={this.setValue} />
                                        </div>
                                    </div><br />
                                    <div>
                                        <br /> <br />
                                        <label className="control-label col-md-3 col-sm-3 col-xs-12">Ulangi Password Baru<span className="required"> :</span>
                                        </label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type="password" id="pass_baru" name="passwordUlangi" required="required" className="form-control col-md-7 col-xs-12" onChange={this.setValue} />
                                        </div>
                                    </div>
                                    <br /><br />
                                    <div className="ln_solid" />
                                    <div className="form-group">
                                        <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                            <Button type="reset" className="btn btn-default">Reset</Button>
                                            <Button className="btn btn-success" defaultValue="Simpan" name="submit" onClick={this.updatePassword}>Simpan</Button>
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

const mapStateToProps = state => ({
    checkLogin: state.AReducer.isLogin,
    userLogin: state.AReducer.dataUser,
    users: state.UReducer.users
})

const mapDispatchToProps = dispatch => {
    return {
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UbahPassword);