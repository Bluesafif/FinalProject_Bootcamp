import React, { Component } from 'react';
import { Input, Button } from "../../component";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            namaLengkap: "",
            alamat: "",
            nomorTelepon: "",
            email: "",
            username: "",
            password: "",
            passwordUlangi: "",
            type:"password",
            type2:"password"
        }
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

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

    doRegis = () => {
        let obj = this.state;

        if (
            obj.namaLengkap === "" || obj.alamat === "" ||
            obj.nomorTelepon === "" || obj.email === "" ||
            obj.username === "" || obj.password === "" || obj.passwordUlangi === ""
        ) {
            alert("Semua Data wajib diisi");
        } else if (obj.password !== obj.passwordUlangi) {
            alert("Password dan Konfirmasi password tidak sesuai");
        } else {
            const objekRegistrasi = {
                username: this.state.username,
                password: this.state.password,
                namaLengkap: this.state.namaLengkap,
                alamat: this.state.alamat,
                nomorTelepon: this.state.nomorTelepon,
                email: this.state.email
            };

            fetch("http://localhost:8080/roti/master/registrasi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(objekRegistrasi),
            })
                .then((response) => response.json())
                .then((json) => {
                    if (typeof json.successMessage !== "undefined") {
                        alert(json.successMessage);
                        this.props.history.push("/login");
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

    validation = () => {
        if (this.props.checkLogin === true && this.props.userLogin.role === "Umum") {
            this.props.history.push("/pelanggan");
        } else if (this.props.checkLogin === true && this.props.userLogin.role === "Member") {
            this.props.history.push("/pelanggan");
        } else if (this.props.checkLogin === true && this.props.userLogin.role === "Admin") {
            this.props.history.push("/admin")
        }
    }

    render() {
        this.validation()
        return (
            <body className="coverbg">
                <div className="regis_wrapper">
                    <section className="login_content">
                        <div className="form">
                            <img src={logo} height="150" alt="Logo" />
                            <h4>Buat Akun Baru</h4>
                            <div>
                                <Input type="text" className="form-control" name="namaLengkap" placeholder="Nama Lengkap" required="required" onChange={this.setValue} value={this.state.namaLengkap} />
                            </div>
                            <div>
                                <Input type="text" className="form-control" name="alamat" placeholder="Alamat" required="required" onChange={this.setValue} value={this.state.alamat} />
                            </div>
                            <div>
                                <Input type="text" className="form-control" name="nomorTelepon" placeholder="Nomor Telepon" required="required" onChange={this.setValue} value={this.state.nomorTelepon} />
                            </div>
                            <span>
                                <Input type="email" className="form-control" name="email" placeholder="Surat Elektronik" required="required" onChange={this.setValue} value={this.state.email} />
                            </span>
                            <div>
                                <Input type="text" className="form-control" name="username" placeholder="Nama Pengguna" required="required" onChange={this.setValue} value={this.state.username} />
                            </div>
                            <div>
                                <Input type={this.state.type} className="form-control input" name="password" placeholder="Kata Sandi" required="required" onChange={this.setValue} value={this.state.password} />
                                <span className="eye-password">
                                    <i className={ this.state.type === "password" ? "fa fa-eye-slash" : "fa fa-eye"}
                                       id="togglePassword"
                                       onClick={() => this.hideshow()}
                                    />
                                </span>
                            </div>
                            <div>
                                <Input type={this.state.type2} className="form-control input" name="passwordUlangi" placeholder="Masukkan Ulang Kata Sandi" required="required" onChange={this.setValue} value={this.state.passwordUlangi} />
                                <span className="eye-password">
                                    <i className={ this.state.type2 === "password" ? "fa fa-eye-slash" : "fa fa-eye"}
                                       id="togglePassword"
                                       onClick={() => this.hideshow2()}
                                    />
                                </span>
                            </div>
                            <div>
                                <Button className="btn btn-success form-control margin-top" onClick={this.doRegis}>Buat Akun</Button>
                            </div>
                            <div className="clearfix" />
                            <div className="separator">
                                <b><p className="change_link">Kembali ke Halaman
                            <Link to="/login" className="to_register"> Masuk! </Link>
                                </p></b>
                                <div>
                                    <p>©2021 UBW. Hak Cipta Dilindungi Undang-Undang.<br />Pengembang Aplikasi Oleh: Al Afif</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </body>
        );
    }
}

const mapStateToProps = state => ({
    checkLogin: state.AReducer.isLogin,
    userLogin: state.AReducer.username,
    users: state.UReducer.users
})

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);