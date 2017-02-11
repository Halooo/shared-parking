/**
 * Created by haos on 09/02/2017.
 */
import React from "react";
import { connect } from "react-redux";

import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField";
import { Form, message } from "antd";
const FormItem = Form.Item;

import { signUp } from "../../actions/signUpAction"
import { finishSignUp } from "../../actions/loginActions"

@connect((store) => {
    return {
        store,
    }
})

export default class CreatePass extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            defaultDate: date,
            first: '',
            last: '',
            email: '',
            phone: '',
            fb: '',
            wechat: '',
            pw: '',
            pwRe: '',
        };
    }
    handleFirstChange(e) {
        this.setState({
            first: e.target.value,
        });
    }
    handleLastChange(e) {
        this.setState({
            last: e.target.value,
        });
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value,
        });
    }
    handlePhoneChange(e) {
        this.setState({
            phone: e.target.value,
        });
    }
    handleWechatChange(e) {
        this.setState({
            wechat: e.target.value,
        });
    }
    handleFbChange(e) {
        this.setState({
            fb: e.target.value,
        });
    }
    handlePwChange(e) {
        this.setState({
            pw: e.target.value,
        });
    }
    handlePwRepeatChange(e) {
        this.setState({
            pwRe: e.target.value,
        });
    }

    handleSignUp(e) {
        const singUpInfo = {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            phone: this.state.phone,
            fb: this.state.fb,
            wechat: this.state.wechat,
            pw: this.state.pw,
            pwRe: this.state.pwRe
        };
        this.props.dispatch(signUp(singUpInfo));
        let err = this.props.store.signup.validationErr;
        if(err) {
            message.error(err, 8)
        }
    }
    render() {
        const BASE_STYLE = {
            position: 'relative',
            background: '#f2f2f2'
        };
        if (this.props.store.signup.signedUp) {
            this.props.dispatch(finishSignUp());
        }
        return (
            <div style={{maxWidth: '400px'}}>
                <div style={BASE_STYLE}>
                    <h1 style={{textAlign: 'left', fontWeight: '200'}}>Sign Up</h1>
                    <Form style={{paddingTop: '20px'}}>
                        <FormItem>
                            {this.state.first ? <TextField
                                    hintText='"Tom"'
                                    floatingLabelText="First Name"
                                    value={this.state.first}
                                    onChange={this.handleFirstChange.bind(this)}
                                /> :
                                <TextField
                                    hintText='"Tom"'
                                    floatingLabelText="First Name"
                                    value={this.state.first}
                                    onChange={this.handleFirstChange.bind(this)}
                                    errorText="required field"
                                />}

                        </FormItem>
                        <FormItem>
                            {this.state.last ? <TextField
                                    hintText='"Tompkins"'
                                    floatingLabelText="Last Name"
                                    value={this.state.last}
                                    onChange={this.handleLastChange.bind(this)}
                                /> :
                                <TextField
                                    hintText='"Tompkins"'
                                    floatingLabelText="Last Name"
                                    value={this.state.last}
                                    onChange={this.handleLastChange.bind(this)}
                                    errorText="required field"
                                />}
                        </FormItem>
                        <FormItem>
                            {this.state.email ? <TextField
                                    hintText='example@example.com'
                                    floatingLabelText="Email"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange.bind(this)}
                                /> :
                                <TextField
                                    hintText='example@example.com'
                                    floatingLabelText="Email"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange.bind(this)}
                                    errorText="required field"
                                />}
                        </FormItem>
                        <FormItem>
                            {!(this.state.phone && this.state.wechat && this.state.fb)
                                ? <p>Please provide at least one contact info</p> : <div></div>}
                            <TextField
                                hintText="eg: 9051231234"
                                floatingLabelText="Phone (suggested)"
                                value={this.state.phone}
                                onChange={this.handlePhoneChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem>
                            <TextField
                                hintText="WeChat Number"
                                floatingLabelText="WeChat"
                                value={this.state.wechat}
                                onChange={this.handleWechatChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem>
                            <TextField
                                hintText="name"
                                floatingLabelText="Facebook"
                                value={this.state.fb}
                                onChange={this.handleFbChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem>
                            <TextField
                                hintText="Password"
                                floatingLabelText="Password"
                                value={this.state.pw}
                                onChange={this.handlePwChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem>
                            <TextField
                                hintText="Password"
                                floatingLabelText="Repeat Password"
                                value={this.state.pwRe}
                                onChange={this.handlePwRepeatChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem style={{float: 'right'}}>
                            <RaisedButton label="Sign Up" primary={true} onClick={this.handleSignUp.bind(this)} />
                        </FormItem>
                    </Form>
                </div>
            </div>
        )


    }
}