/**
 * Created by haos on 26/01/2017.
 */
import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Layout from "./components/Layout"

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Layout />
                </div>
            </MuiThemeProvider>
        )
    }
}
