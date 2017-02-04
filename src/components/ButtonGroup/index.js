/**
 * Created by haos on 27/01/2017.
 */
import React from "react"
import { connect } from "react-redux"

import StepButton from "./StepButton"
import stepConfig from "./step.config.js"

@connect((store) => {
    return {
        stepData: store.steps
    }
})

export default class ButtonGroup extends React.Component {
    render() {
        const stepData = this.props.stepData;
        const steps = stepConfig(stepData);
        const currentSteps = steps.map(step => <StepButton key={step.id} btnOpt={step} />);
        return (
            <div className="btn-toolbar" style={{paddingTop: '10px'}}>
                { currentSteps }
            </div>
        )
    }
}