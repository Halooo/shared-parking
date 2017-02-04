/**
 * Created by haos on 27/01/2017.
 */
import React from "react"
import { connect } from "react-redux"

import { setCurrStep } from "../../actions/stepActions"

@connect((store) => {
    return {
        currentStep: store.steps.currId
    }
})

export default class ButtonGroup extends React.Component {
    componentWillMount() {
        this.props.dispatch(setCurrStep(0));
    }

    handleClick() {
        // either toggle up window with this.prop.linkref or call func from actions
        this.props.dispatch(setCurrStep(this.props.btnOpt.id));
    }

    render() {
        const BASE_STYLE = {

        }
        const option = this.props.btnOpt;
        const isEnable = option.id === option.currentStepId;
        return (
            <button className="btn btn-primary" style={this.props.style || BASE_STYLE}
                    onClick={this.handleClick.bind(this)} disabled={!isEnable}>
                {option.btnText}
                {/*<a href={option.linkref}></a>*/}
            </button>
        )
    }
}