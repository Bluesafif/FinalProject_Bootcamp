import React, { Component } from 'react';
import { Input, Button } from "../../component";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom"

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <body className="coverbg">
            <div className="regis_wrapper">
                <section className="login_content">
                    <form>
                        <img src={logo} height="125" alt="Logo" />
                        <h4>Silahkan,<br />Buat Akun Baru</h4>
                        <div>
                            <Input type="text" className="form-control" placeholder="Nama Lengkap" required />
                        </div>
                        <div>
                            <Input type="text" className="form-control" placeholder="Alamat" required />
                        </div>
                        <div>
                            <Input type="text" className="form-control" placeholder="Nomor Telepon" required />
                        </div>
                        <div>
                            <Input type="email" className="form-control" placeholder="Surat Elektronik" required />
                        </div>
                        <div>
                            <Input type="text" className="form-control" placeholder="Nama Pengguna" required />
                        </div>
                        <div>
                            <Input type="password" className="form-control" placeholder="Kata Sandi" required />
                        </div>
                        <div>
                            <Button className="btn btn-success form-control" href="index.html">Buat Akun</Button>
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
                    </form>
                </section>
            </div>
            </body>
        );
    }
}

export default Register;