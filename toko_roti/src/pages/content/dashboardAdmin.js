import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashboardAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div className="">
                    <div className="page-title">
                        <div className="title_left">
                            <h3>Dashboard</h3>
                        </div>
                    </div>
                    <div className="clearfix" />
                    <div className="row top_tiles">
                        <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-arrow-down" /></div>
                                <div className="count">0</div>
                                <h3>Roti Terbuat</h3>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-arrow-up" /></div>
                                <div className="count">0</div>
                                <h3>Roti Terjual</h3>
                            </div>
                        </div>
                        <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div className="tile-stats">
                                <div className="icon"><i className="fa fa-money" /></div>
                                <div className="count">0</div>
                                <h3>Pendapatan Sebulan</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>Welcome</h2>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <div className="col-md-8 col-lg-8 col-sm-7">
                                        <blockquote>
                                            <span className="info-box-number">SELAMAT DATANG DI URBAN BAKERY WORKS.</span>
                                            <p>Silahkan pilih menu Navigator untuk mempermudah anda.</p>
                                            <footer>Jangan lupa senyum hari ini ;)</footer>
                                        </blockquote>
                                    </div>
                                    <div className="clearfix" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardAdmin;