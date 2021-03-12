import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { Login, Register, HomeAdmin, HomePelanggan, RotiAdmin, Laporan, Profil, Pengguna, UbahPassword, EditPengguna, TambahAdmin, EditPenggunaPel, TambahRoti, EditRoti } from "../../pages"

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Switch>
                <Route exact path="/login" component={props =>   <Login {...props} />}/>
                <Route path="/register" component={props =>   <Register {...props} />}/>
                <Route path="/admin" component={props =>   <HomeAdmin {...props} />}/>
                <Route path="/admin-roti" component={props =>   <RotiAdmin {...props} />}/>
                <Route path="/admin-laporan" component={props =>   <Laporan {...props} />}/>
                <Route path="/admin-pengguna" component={props =>   <Pengguna {...props} />}/>
                <Route path="/admin-editpengguna/:idUser" component={props =>   <EditPengguna {...props} />}/>
                <Route path="/admin-tambahpengguna" component={props =>   <TambahAdmin {...props} />}/>
                <Route path="/admin-tambahroti" component={props =>   <TambahRoti {...props} />}/>
                <Route path="/admin-editroti/:idRoti" component={props =>   <EditRoti {...props} />}/>
                <Route path="/pelanggan" component={props =>   <HomePelanggan {...props} />}/>
                <Route path="/pelanggan-editpelanggan/:idUser" component={props =>   <EditPenggunaPel {...props} />}/>
                <Route path="/data-pelanggan" component={props =>   <Profil {...props} />}/>
                <Route path="/ubah-password" component={props =>   <UbahPassword {...props} />}/>
            </Switch>
        );
    }
}
 
export default Body;