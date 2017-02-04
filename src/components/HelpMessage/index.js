/**
 * Created by haos on 30/01/2017.
 */
import React from "react"
import { connect } from "react-redux"

import messageConfig from "./message.config"

@connect((store) => {
    return {
        store,
        currentStep: store.steps.currId
    }
})

export default class HelpMessage extends React.Component {
    render () {
        const BASE_STYLE = this.props.style || {
            textBox: {
                base: {
                    padding: '5px'
                },
                current: {
                    backgroundColor: '#3399ff'
                },
                active: {
                    backgroundColor: '#f1f3f2'
                },
                typeA: {
                    borderLeft: '3px solid #52c1b9',
                },
                typeB: {
                    borderLeft: '3px solid #bd10e0',
                }
            }
        };
        const TextBox = ({active = false, current = false, type = 'typeA', msg}) => {
            let style = {};
            style = Object.assign({}, BASE_STYLE.textBox.base);
            if (current) {
                Object.assign(style, BASE_STYLE.textBox.current);
            } else if (active) {
                Object.assign(style, BASE_STYLE.textBox.active);
            }

            if(type == 'typeA') {
                Object.assign(style, BASE_STYLE.textBox.typeA);
            }
            else if(type == 'typeB') {
                Object.assign(style, BASE_STYLE.textBox.typeB);
            }
            return (
                <div style={style}>{msg}</div>
            );
        };
        const totalSteps = messageConfig.configuration.length;
        const currentStep = this.props.currentStep;
        let domContainer = [];
        for (let i = 1; i <= totalSteps; i++) {
            console.log(messageConfig);
            let msgBox;
            let vertical = true;

            if (i < currentStep) {
                msgBox = <TextBox type={messageConfig.configuration[i-1].type} active={true} msg={messageConfig.configuration[i-1].helpMessage}/>;
            } else if (i == currentStep) {
                msgBox = <TextBox type={messageConfig.configuration[i-1].type} current={true} msg={messageConfig.configuration[i-1].helpMessage}/>;
            } else {
                msgBox = <TextBox type={messageConfig.configuration[i-1].type} msg={messageConfig.configuration[i-1].helpMessage}/>;
            }

            domContainer.push(<div key={i}>{msgBox}</div>)
        }
        const wrapperStyle = {
            maxWidth: '180px',
            border: '1px solid #ddd',
            borderRadius: '4px',
        };
        return (
            <div style={wrapperStyle}>
                { domContainer }
            </div>
        )
    }
}