import React from "react"
import { connect } from "react-redux"

import ButtonGroup from "../ButtonGroup"
import Steps from "../StepBar"
import HelpMessage from "../HelpMessage"

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <div>
                        <Steps vertical={false}/>
                    </div>
                </div>
                <div>
                    <div>
                        <HelpMessage />
                    </div>
                    <div>
                        <Steps vertical={true} />
                    </div>
                    <div>
                        <ButtonGroup />
                    </div>
                </div>
            </div>
        )
    }
}
