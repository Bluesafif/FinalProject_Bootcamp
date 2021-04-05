import React, { Component } from 'react';
import { Button, Input, Label } from '../../component';
import { connect } from 'react-redux';

class UbahPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordLama: "",
            password : "",
            passwordUlangi: "",
            userProfil: {},
            type:"password",
            type2:"password",
            type3:"password"
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
        if (
            obj.passwordLama === "" || obj.password === "" ||
            obj.passwordUlangi === ""
        ) {
            alert("Password baru dan Konfirmasi password baru wajib diisi");
        } else if (obj.passwordLama === obj.password) {
            alert("Password lama dan Password baru tidak boleh sama")
        } else if (obj.password !== obj.passwordUlangi) {
            alert("Password dan Konfirmasi password baru tidak sesuai");
        } else {
            const dataPassword = {
                username: this.props.userLogin.username,
                password: this.state.password
            };
            fetch(`http://localhost:8080/roti/master/changePass?passwordLama=`+obj.passwordLama+``, {
                method: "PUT",
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
                    } else if (typeof json.successMessage !== "undefined") {
                        alert(
                            json.successMessage
                        );
                        this.props.logout()
                        if (this.props.checkLogin === false) {
                            this.refreshPage()
                        }
                    }
                })
                .catch((e) => {
                });
        }
    };

    hideshow = () => {
        if(this.state.type === "password"){
            this.setState({
                type: "text"
            })
        }
        else{
            this.setState({
                type: "password"
            })
        }
    }

    hideshow2 = () => {
        if(this.state.type2 === "password"){
            this.setState({
                type2: "text"
            })
        }
        else{
            this.setState({
                type2: "password"
            })
        }
    }

    hideshow3 = () => {
        if(this.state.type3 === "password"){
            this.setState({
                type3: "text"
            })
        }
        else{
            this.setState({
                type3: "password"
            })
        }
    }

    componentDidMount() {
        this.getProfil()
    }

    doLogout = () => {
        this.props.logout()
        window.alert("Anda telah berhasil keluar!")
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
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Password Lama<span className="required"> :</span>
                                        </Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type={this.state.type} id="pass_lama" name="passwordLama" required="required" className="form-control col-md-7 col-xs-12" onChange={this.setValue} />
                                            <span className="eye-password-form">
                                                <i className={ this.state.type === "password" ? "fa fa-eye-slash" : "fa fa-eye"}
                                                id="togglePassword"
                                                onClick={() => this.hideshow()}
                                                />
                                            </span>
                                        </div>
                                    </div><br />
                                    <div>
                                        <br /> <br />
                                        <Label className="control-label col-md-3 col-sm-3 col-xs-12">Password Baru<span className="required"> :</span>
                                        </Label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type={this.state.type2} id="pass_baru" name="password" required="required" className="form-control col-md-7 col-xs-12" onChange={this.setValue} />
                                            <span className="eye-password-form">
                                                <i className={ this.state.type2 === "password" ? "fa fa-eye-slash" : "fa fa-eye"}
                                                id="togglePassword"
                                                onClick={() => this.hideshow2()}
                                                />
                                            </span>
                                        </div>
                                    </div><br />
                                    <div>
                                        <br /> <br />
                                        <label className="control-label col-md-3 col-sm-3 col-xs-12">Ulangi Password Baru<span className="required"> :</span>
                                        </label>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <Input type={this.state.type3} id="pass_baru" name="passwordUlangi" required="required" className="form-control col-md-7 col-xs-12" onChange={this.setValue} />
                                            <span className="eye-password-form">
                                                <i className={ this.state.type3 === "password" ? "fa fa-eye-slash" : "fa fa-eye"}
                                                id="togglePassword"
                                                onClick={() => this.hideshow3()}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <br /><br />
                                    <div className="ln_solid" />
                                    <div className="form-group">
                                        <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
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
        logout: () => dispatch({ type: "LOGOUT_SUCCESS" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UbahPassword);