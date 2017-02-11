/**
 * Created by haos on 26/01/2017.
 */
import React from "react"
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
    render() {
        console.log(1)
        return (
            <MuiThemeProvider>
                {this.props.loggedIn ? <Layout/> : <Login/>}
                {/*<Layout/>*/}
            </MuiThemeProvider>
        )
    }
}
