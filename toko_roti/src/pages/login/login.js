import React, { Component } from 'react';
import { Input, Button } from "../../component";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div className="login_wrapper">
                    <div className="animate form login_form">
                        <section className="login_content">
                            <form>
                                <img src={logo} height="125" alt="Logo" />
                                <h4>Silahkan,<br />Masuk ke Akun Anda</h4>
                                <div>
                                    <Input type="text" className="form-control" placeholder="Nama Pengguna" required />
                                </div>
                                <div>
                                    <Input type="password" className="form-control" placeholder="Kata Sandi" required />
                                </div>
                                <div>
                                    <Button className="btn btn-success form-control" href="index.html">Masuk</Button>
                                </div>
                                <div className="clearfix" />
                                <div className="separator">
                                    <b><p>Belum Memiliki Akun?
                                        <Link to="/register" className="to_register"> Buat Akun! </Link>
                                    </p></b>
                                    <div className="clearfix" />
                                    <br />
                                    <div>
                                        <p>©2021 UBW. Hak Cipta Dilindungi Undang-Undang.<br />Pengembang Aplikasi Oleh: Al Afif</p>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;