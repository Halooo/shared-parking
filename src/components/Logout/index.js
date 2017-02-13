/**
 * Created by hsun on 2017-02-11.
 */

import React from "react";
import { connect } from "react-redux";

import cookie from "react-cookie";
import {logout} from "../../actions/loginActions";
import {message} from "antd";

@connect((store) => {
    return {
        store,
    }
})
export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(logout());
        cookie.remove('userId');
        message.success('Successfully logged out', 3);
    }


    render() {

        return (
            <div style={{margin: 'auto'}}>
                <h1 style={{textAlign: 'center', marginTop: '50%'}}>Successfully Logged Out!</h1>
            </div>
        )
    }
}