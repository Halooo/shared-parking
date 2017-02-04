/**
 * Created by haos on 30/01/2017.
 */
import React from "react"
import { connect } from "react-redux"

import stepConfig from "../ButtonGroup/step.config"

@connect((store) => {
    return {
        store,
        currentStep: store.steps.currId
    }
})

export default class StepBar extends React.Component {
    render () {
        const BASE_STYLE = {
            dotVertical: {
                base: {
                    background: 'white',
                    border: '1px solid #757171',
                    borderRadius: '50%',
                    height: '28px',
                    width: '28px',
                },
                active: {
                    border: '1px solid #50e3c2',
                    background: '#50e3c2'
                },
                current: {
                    border: '1px solid #50e3c2',
                },
            },
            lineVertical: {
                base: {
                    background: '#757171',
                    height: '100px',
                    position: 'relative',
                    left: '14px',
                    width: '2px',
                },
                active: {
                    background: '#50e3c2',
                },
            },
            dot: {
                base: {
                    background: 'white',
                    border: '2px solid #D6D6D6',
                    borderRadius: '50%',
                    float: 'left',
                    height: '28px',
                    width: '28px',
                },
                active: {
                    border: '2px solid #3399ff',
                    background: '#3399ff'
                },
                current: {
                    border: '2px solid #3399ff',
                },
            },
            line: {
                base: {
                    background: '#D6D6D6',
                    float: 'left',
                    height: '2px',
                    marginLeft: '10px',
                    marginRight: '10px',
                    position: 'relative',
                    top: '14px',
                    width: '100px',
                },
                active: {
                    background: '#3399ff',
                },
            }
        };

        const Dot = ({active = false, current = false, styling = true, vertical = false}) => {
            let style = {};
            if (styling) {
                if(vertical) {
                    style = Object.assign({}, BASE_STYLE.dotVertical.base);
                    if (current) {
                        Object.assign(style, BASE_STYLE.dotVertical.current);
                    } else if (active) {
                        Object.assign(style, BASE_STYLE.dotVertical.active);
                    }
                }
                else {
                    style = Object.assign({}, BASE_STYLE.dot.base);
                    if (current) {
                        Object.assign(style, BASE_STYLE.dot.current);
                    } else if (active) {
                        Object.assign(style, BASE_STYLE.dot.active);
                    }
                }
            }
            return (
                <div style={style} />
            );
        };

        const Line = ({active = false, styling = true, vertical = false}) => {
            let style = {};
            if (styling) {
                if(vertical) {
                    style = Object.assign({}, BASE_STYLE.lineVertical.base);
                    if (active) Object.assign(style, BASE_STYLE.lineVertical.active);
                } else {
                    style = Object.assign({}, BASE_STYLE.line.base);
                    if (active) Object.assign(style, BASE_STYLE.line.active);
                }
            }
            return (
                <div style={style} />
            );
        };

        const totalSteps = stepConfig(this.props.store.steps.currId).length;
        const currentStep = this.props.currentStep;
        let domContainer = [];
        for (let i = 1; i <= totalSteps; i++) {
            console.log(currentStep, totalSteps);
            let dot, line;
            let vertical = this.props.vertical;

            if (i < currentStep) {
                dot = <div><Dot active={true} current={false} styling={true} vertical={vertical} /></div>;
                // line = <div><Line active={true} styling={true} /></div>
            } else if (i == currentStep) {
                dot = <div><Dot active={false} current={true} styling={true} vertical={vertical} /></div>
            } else {
                dot = <div><Dot active={false} current={false} styling={true} vertical={vertical} /></div>
            }

            line = i <= currentStep ? <div><Line active={true} styling={true} vertical={vertical} /></div>
                : <div><Line active={false} styling={true} vertical={vertical} /></div>;

            if (i === 1) {
                domContainer.push(<div key={i}>{dot}</div>)
            }
            else {
                domContainer.push(<div key={i}>{line} {dot}</div>)
            }

        }

        // const currentSteps = domContainer.forEach(step => <StepButton key={step.id} btnOpt={step} />);

        return (
            <div>
                { domContainer }
            </div>
        )
    }
}