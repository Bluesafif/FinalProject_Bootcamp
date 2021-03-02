import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { Login, Register } from "../../pages"

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Switch>
                <Route exact path="/" component={props =>   <Login {...props} />}/>
                <Route path="/register" component={props =>   <Register {...props} />}/>
            </Switch>
        );
    }
}
 
export default Body;