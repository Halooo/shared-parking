/**
 * @author Hao
 * @date 2017-02-04
 * @fileoverview
 */
import React from "react";
import { connect } from "react-redux";

import { Breadcrumb, Table, Input, Button } from "antd";
import FlatButton from "material-ui/FlatButton";


@connect((store) => {
    return {
        store,
        data: store.list.data,
        stepData: store.steps,
        // data : [{
        //     key: '1',
        //     time: '201702051830',
        //     fare: 3,
        //     location: 'New York No. 1 Lake Park',
        // }, {
        //     key: '2',
        //     time: '201702051830',
        //     fare: 4,
        //     location: 'London No. 1 Lake Park',
        // }, {
        //     key: '3',
        //     time: '201702051830',
        //     fare: 1,
        //     location: 'Sidney No. 1 Lake Park',
        // }, {
        //     key: '4',
        //     time: '201702051830',
        //     fare: 2,
        //     location: 'London No. 2 Lake Park',
        // }]
    }
})

export default class ListPass extends React.Component {
    constructor(props) {
        super(props);
        let data = [];

        this.state = {
            timeFilterDropdownVisible: false,
            locationFilterDropdownVisible: false,
            data,
            searchTime: '',
            searchLocation: '',
        }
    }
    componentWillMount() {
        const listData = this.props.store.list.data;
        let i = 0;
        for (let item in listData) {
            let temp = this.state.data;
            temp.push(listData[item]);
            temp[i].id = i;
            let tempDate = temp[i].date;
            let tempTime = temp[i].time;
            tempDate = temp[i].date.substring(5,10);
            tempTime = temp[i].time.substring(11,19);
            temp[i].time = tempDate + ' ' + tempTime;
            console.log("temp",tempTime)
            this.setState({data: temp})
            i++;
        }

    }
    componentDidMount() {

    }

    onTimeInputChange(e) {
        this.setState({ searchTime: e.target.value });
    }
    onLocationInputChange(e) {
        this.setState({ searchLocation: e.target.value });
    }
    onSearchTime() {
        const { searchTime } = this.state;
        const reg = new RegExp(searchTime, 'gi');

        this.setState({
            timeFilterDropdownVisible: false,

            data: this.state.data.map((record) => {
                const match = record.time.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    time: (
                        <span>
                          {record.time.split(reg).map((text, i) => (
                              i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                          ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }
    onSearchLocation() {
        const { searchLocation } = this.state;
        const reg = new RegExp(searchLocation, 'gi');
        this.setState({
            locationFilterDropdownVisible: false,
            data: this.state.data.map((record) => {
                const match = record.location.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    location: (
                        <span>
              {record.location.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }
    clearSearch() {
        this.setState({
            searchTime: '',
            searchLocation: '',
            data: this.props.data,
        })
    }
    render() {
        const columns = [{
            title: 'Date',
            dataIndex: 'time',
            key: 'date',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        placeholder="Search Time (eg: 6:30pm is 1830)"
                        value={this.state.searchTime}
                        onChange={this.onTimeInputChange.bind(this)}
                        onPressEnter={this.onSearchTime.bind(this)}
                    />
                    <Button type="primary" onClick={this.onSearchTime.bind(this)}>Search</Button>
                </div>
            ),
            timeFilterDropdownVisible: this.state.timeFilterDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ timeFilterDropdownVisible: visible }),
        }, {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        placeholder="Search location"
                        value={this.state.searchLocation}
                        onChange={this.onLocationInputChange.bind(this)}
                        onPressEnter={this.onSearchLocation.bind(this)}
                    />
                    <Button type="primary" onClick={this.onSearchLocation.bind(this)}>Search</Button>
                </div>
            ),
            locationFilterDropdownVisible: this.state.locationFilterDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ locationFilterDropdownVisible: visible }),

        }, {
            title: 'Fare',
            dataIndex: 'fare',
            key: 'fare',
            sorter: (a, b) => a.fare - b.fare
        }];

        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>My Lists</Breadcrumb.Item>
                    <Breadcrumb.Item>All Lists</Breadcrumb.Item>
                </Breadcrumb>
                <FlatButton label="Clear Search Options" primary={true} onClick={this.clearSearch.bind(this)}  />
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        )

    }
}