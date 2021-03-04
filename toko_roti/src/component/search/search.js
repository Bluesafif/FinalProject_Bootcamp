import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="row">
                    <div className="col-lg-6">
                        <div className="input-group">
                            <span className="input-group-btn">
                                <label className="btn btn-default" type="button">Cari :</label>
                            </span>
                            <input type="text" className="form-control" placeholder="Cari..." />
                        </div>
                    </div>
            </div>
        );
    }
}

export default Search;