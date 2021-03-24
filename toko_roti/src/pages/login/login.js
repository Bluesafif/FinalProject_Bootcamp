import React, { Component } from 'react';
import { Input, Button } from "../../component";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom"
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            users: {}
        }
    }

    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    doLogin = (e) => {
        const {username, password} = e
        if( username === "" || password === ""){
            window.alert("Isi semua data !!")
        } else {
            fetch(`http://localhost:8080/roti/master/auth/?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
                method : "GET",
                headers: {
                    "Content-Type": "application/json; ; charset=utf-8",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    "Access-Control-Allow-Origin": "*",
                }
            })

            .then(resp=>{
                if(!resp.ok){
                    return resp.json().then(text => {
                        throw new Error (`${text.errorMessage}`)
                    })
                } else {
                    return resp.json()
                }
            })
            .then(json=>{
                this.setState({
                    users:json
                });
                console.log("Data ",this.state.users);
            if(this.state.users.role === "Admin"){
                this.props.submitLogin({ data: this.state.users});
                this.props.history.push("/admin");
                window.alert("Selamat! Anda berhasil masuk!")
            }else if(this.state.users.role === "Umum" || this.state.users.role === "Member" ){
                this.props.submitLogin({ data: this.state.users});
                this.props.history.push("/pelanggan");
                window.alert("Selamat! Anda berhasil masuk!")
            }
            })
            .catch((e) => {
                window.alert(e);
            });
        }
    }

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
        const { username, password } = this.state;
        return (
            <div className="coverbg">
                <div className="login_wrapper">
                    <div className="animate form login_form">
                        <section className="login_content">
                            <div className="form">
                                <img src={logo} height="150" alt="Logo" />
                                <h4>Silahkan,<br />Masuk ke Akun Anda</h4>
                                <div>
                                    <Input type="text" name="username" className="form-control input" placeholder="Nama Pengguna" required="required" onChange={this.setValue} />
                                </div>
                                <div>
                                    <Input type="password" name="password" className="form-control input" placeholder="Kata Sandi" required="required" onChange={this.setValue} />
                                </div>
                                <div>
                                    <Button className="btn btn-success form-control margin-top" onClick={() => this.doLogin({username, password})}>Masuk</Button>
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
                            </div>
                        </section>
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
      submitLogin: (data) => dispatch({type: "LOGIN_SUCCESS", payload:data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);