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
            passwordUlangi: ""
        }
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    doRegis = () => {
        let obj = this.state;
        console.log(obj.password);
        console.log(obj.passwordUlangi);

        if (
            obj.namaLengkap === "" || obj.alamat === "" ||
            obj.nomorTelepon === "" || obj.email === "" ||
            obj.username === "" || obj.password === "" || obj.passwordUlangi === ""
        ) {
            alert("Semua Data wajib diisi");
            // }else if(obj.username.length < 6 || obj.username.length > 8){
            //   swal("Gagal !", "Panjang username antara 6-8 huruf", "error");
            // }else if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(obj.email))){
            //   swal("Gagal !", "Format Email Tidak Sesuai", "error");
            // }else if(!(/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/i.test(obj.phone))){
            //   swal("Gagal !", "Format No.HP Tidak Sesuai", "error");
            // }else if(!(/^(?=.[a-z])(?=.[A-Z])(?=.*\d)[A-Za-z\d]{6,8}$/i.test(obj.password))){
            //   swal("Gagal !", "Password minimal 6 karakter dan maksimal 8 karakter yang terdiri dari minimal 1 huruf besar, 1 huruf kecil, satu angka", "error");
        } else if (obj.password !== obj.passwordUlangi) {
            alert("Password dan Konfirmasi password tidak sesuai");
        } else {
            const objekRegistrasi = {
                username: this.state.username,
                password: this.state.password,
                namaLengkap: this.state.namaLengkap,
                alamat: this.state.alamat,
                nomorTelepon: this.state.nomorTelepon,
                email: this.state.email,
                role: "Umum"
            };

            console.log(objekRegistrasi)

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
                    if (typeof json.errorMessage !== "undefined") {
                        alert(json.errorMessage);
                    } else if (typeof json.errorMessage === "undefined") {
                        alert(
                            json.errorMessage
                        );
                        this.props.history.push("/login");
                    }
                })
                .catch((e) => {
                    window.alert(e);
                });
        }
    };

    render() {
        return (
            <body className="coverbg">
                <div className="regis_wrapper">
                    <section className="login_content">
                        <div className="form">
                            <img src={logo} height="125" alt="Logo" />
                            <h4>Silahkan,<br />Buat Akun Baru</h4>
                            <div>
                                <Input type="text" className="form-control" name="namaLengkap" placeholder="Nama Lengkap" required onChange={this.setValue} value={this.state.namaLengkap} />
                            </div>
                            <div>
                                <Input type="text" className="form-control" name="alamat" placeholder="Alamat" required="required" onChange={this.setValue} value={this.state.alamat} />
                            </div>
                            <div>
                                <Input type="text" className="form-control" name="nomorTelepon" placeholder="Nomor Telepon" required="required" onChange={this.setValue} value={this.state.nomorTelepon} />
                            </div>
                            <div>
                                <Input type="email" className="form-control" name="email" placeholder="Surat Elektronik" required="required" onChange={this.setValue} value={this.state.email} />
                            </div>
                            <div>
                                <Input type="text" className="form-control" name="username" placeholder="Nama Pengguna" required="required" onChange={this.setValue} value={this.state.username} />
                            </div>
                            <div>
                                <Input type="password" className="form-control" name="password" placeholder="Kata Sandi" required="required" onChange={this.setValue} value={this.state.password} />
                            </div>
                            <div>
                                <Input type="password" className="form-control" name="passwordUlangi" placeholder="Masukkan Ulang Kata Sandi" required="required" onChange={this.setValue} value={this.state.passwordUlangi} />
                            </div>
                            <div>
                                <Button className="btn btn-success form-control" onClick={this.doRegis}>Buat Akun</Button>
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