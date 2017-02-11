/**
 * Created by haos on 26/01/2017.
 */
import React from "react";
import cookie from "react-cookie";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'antd/dist/antd.css';

import Layout from "./components/Layout";
import Login from "./components/Login";

import { connect } from "react-redux";

@connect((store) => {
    return {
        store,
        loggedIn: store.login.loggedIn
    }
})

export default class App extends React.Component {
    componentWillMount() {
        this.state = {userId:cookie.load('userId')}
    }
    render() {
        console.log('cookies', this.state.userId , this.props.loggedIn)
        return (
            <MuiThemeProvider>
                {this.state.userId || this.props.loggedIn ? <Layout/> : <Login/>}
            </MuiThemeProvider>
        )
    }
}
