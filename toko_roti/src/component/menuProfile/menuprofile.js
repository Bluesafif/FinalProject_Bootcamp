import React, { Component } from 'react';
import profilepic from '../../assets/user.png'

class MenuProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="profile clearfix">
                <div className="profile_pic">
                    <img src={profilepic} alt="..." className="img-circle profile_img" />
                </div>
                <div className="profile_info">
                    <span>Welcome,</span>
                    <h2>Admin</h2>
                </div>
            </div>
        );
    }
}
 
export default MenuProfile;