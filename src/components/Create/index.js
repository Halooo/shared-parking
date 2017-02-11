/**
 * @author Hao
 * @date 2017-02-04
 * @fileoverview
 */
import React from "react";
import { connect } from "react-redux";

import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField";
import { Form } from "antd";
const FormItem = Form.Item;

import { createPass } from "../../actions/createAction";
import { listAll } from "../../actions/listActions"

@connect((store) => {
    return {
        store,
        stepData: store.steps
    }
})

export default class CreatePass extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            defaultDate: date,
            time: null,
            location: '',
            sharedFare: '',
        };
    }
    componentDidUpdate() {
        this.props.dispatch(listAll());
    }
    handleDate(e,date) {
        this.setState({defaultDate: date})
    }
    handleTime(e,time) {
        this.setState({time: time})
    }
    handleLocationChange(e) {
        this.setState({
            location: e.target.value,
        });
    }

    handleSharedFareChange(e) {
        this.setState({
            sharedFare: e.target.value,
        });
    }

    handleCreate(e) {
        this.props.dispatch(createPass({
            data: {
                date: this.state.defaultDate,
                time: this.state.time,
                location: this.state.location,
                sharedFare: this.state.sharedFare,
                email: this.props.store.login.email,
            }
        }));
    }
    render() {
        const BASE_STYLE = {
            position: 'relative',
            background: '#f2f2f2'
            // top: '50%',
            // left: '50%',
            // marginRight: '-50%',
            // transform: 'translate(-50%, -50%)',
        };
        return (
            <div style={{maxWidth: '400px'}}>
                <div style={BASE_STYLE}>
                    <h1 style={{textAlign: 'left', fontWeight: '200'}}>Share My Pass</h1>
                    <Form style={{paddingTop: '20px'}}>
                        <FormItem>
                            <p>Pick a Day</p>
                            <DatePicker
                                onChange={this.handleDate.bind(this)}
                                hintText="Pick Date"
                                defaultDate={this.state.defaultDate}
                            />
                        </FormItem>
                        <FormItem>
                            <p>Select Time to Meet</p>
                            <TimePicker onChange={this.handleTime.bind(this)} hintText="Pick Time" />
                        </FormItem>
                        <FormItem>
                            <TextField
                                hintText='Suggested Format: "lot M"'
                                floatingLabelText="Location"
                                value={this.state.location}
                                onChange={this.handleLocationChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem>
                            <TextField
                                hintText="Enter Fare They Will Pay"
                                floatingLabelText="Price"
                                value={this.state.sharedFare}
                                onChange={this.handleSharedFareChange.bind(this)}
                            />
                        </FormItem>
                        <FormItem >
                            <RaisedButton label="Create" primary={true} onClick={this.handleCreate.bind(this)}  />
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}