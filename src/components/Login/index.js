/**
 * @author Hao
 * @date 2017-02-04
 * @fileoverview
 */

import React from "react";
import { connect } from "react-redux";

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { login, startSignUp } from "../../actions/loginActions";
import { listAll } from "../../actions/listActions"
const FormItem = Form.Item;

import SignUp from "../SignUp";

@connect((store) => {
    return {
        store,
        currentStep: store.login.loggedIn
    }
})

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signUp: false,
            email: '',
            pwAvatar:'',
            pw: '',
        };
    }

    handleLogin(e) {
        e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values);
        //         this.props.dispatch(login());
        //     }
        // });
        this.props.dispatch(login({
            data: {
                email: this.state.email,
                pw: this.state.pw
            }
        }));
    }
    signUp() {
        this.setState({signUp: true});
        this.props.dispatch(startSignUp())
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value,
        });
    }

    handlePwChange(e) {
        this.setState({
            pw: e.target.value,
        });
    }

    componentDidMount() {
        this.props.dispatch(listAll());
    }
    render() {
        const LOGIN_BASE_STYLE = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        };
        if(this.props.store.login.signUp) {
            return <SignUp />
        }
        else {
            return (
                <div style={{positon:'relative'}}>
                    <Form style={LOGIN_BASE_STYLE}>
                        <FormItem>
                            <TextField
                                hintText="Enter Email"
                                floatingLabelText="Email"
                                value={this.state.email}
                                onChange={this.handleEmailChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem>
                            <TextField
                                hintText="Enter Password"
                                floatingLabelText="Password"
                                value={this.state.pw}
                                onChange={this.handlePwChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem>
                            <FlatButton label="Sign Up" onClick={this.signUp.bind(this)}/>
                            <RaisedButton label="Login" primary={true} onClick={this.handleLogin.bind(this)} />
                        </FormItem>
                    </Form>
                </div>
            )
        }
    }

}