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

@connect((store) => {
    return {
        stepData: store.steps
    }
})

export default class CreatePass extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            defaultDate: date,
            location: '',
            sharedFare: '',
        };
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
                                hintText="Pick Date"
                                defaultDate={this.state.defaultDate}
                            />
                        </FormItem>
                        <FormItem>
                            <p>Select Time to Meet</p>
                            <TimePicker hintText="Pick Time" />
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
                        <FormItem style={{float: 'right'}}>
                            <RaisedButton label="Create" primary={true} onClick={this.handleCreate.bind(this)}  />
                        </FormItem>

                    </Form>

                </div>
            </div>
        )
    }
}