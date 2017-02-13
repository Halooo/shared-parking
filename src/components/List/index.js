/**
 * @author Hao
 * @date 2017-02-04
 * @fileoverview
 */
import React from "react";
import { connect } from "react-redux";
import cookie from "react-cookie";

import { Breadcrumb, Table, Input, Button, Icon } from "antd";
import FlatButton from "material-ui/FlatButton";
import { listAll, deleteListing } from "../../actions/listActions";

@connect((store) => {
    return {
        store,
        data: store.list.data,
        stepData: store.steps,
    }
})

export default class ListPass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeFilterDropdownVisible: false,
            locationFilterDropdownVisible: false,
            data: [],
            myData:[],
            searchTime: '',
            searchLocation: '',
            listall: true,
        }
    }
    componentWillMount() {
        this.reload();
        this.reload();
        // const user = cookie.load('userId');
        // let date = new Date();
        // let timeStamp = date.getTime();
        // this.props.dispatch(listAll());
        // this.state.data = [];
        // this.state.myData = [];
        // const listData = this.props.store.list.data;
        // let i = 1;
        // for (let item in listData) {
        //     let temp = this.state.data;
        //     let myTemp = this.state.myData;
        //
        //     let dataObj = {};
        //     dataObj.key = i;
        //     dataObj._id = listData[item]._id;
        //     dataObj.location = listData[item].location;
        //     dataObj.fare = listData[item].fare;
        //     dataObj.children = [
        //         {
        //             key: timeStamp/10+i,
        //             time: 'Email',
        //             location: 'WeChat',
        //             fare: 'Phone',
        //         }, {
        //             key: timeStamp+i,
        //             time: listData[item].author,
        //             location: listData[item].wechat,
        //             fare: listData[item].phone,
        //         }
        //     ];
        //     let tempDate = listData[item].date;
        //     let tempTime = listData[item].time;
        //     tempDate = listData[item].date.substring(4,11);
        //     tempTime = listData[item].time.substring(16,21);
        //     dataObj.time = tempDate + ' - ' + tempTime;
        //     temp.push(dataObj);
        //     if (dataObj.children[1].time == user) {
        //         myTemp.push(dataObj);
        //     }
        //     this.setState({data: temp});
        //     this.setState({myData: myTemp});
        //     i++;
        // }
        // let myTemp = this.state.myData;
        // myTemp.map((item) => {
        //     delete item['children'];
        //     item.fare = 'x';
        // });
        // this.setState({myData: myTemp});
    }
    reload() {
        const user = cookie.load('userId');
        let date = new Date();
        let timeStamp = date.getTime();
        this.props.dispatch(listAll());
        this.state.data = [];
        this.state.myData = [];
        const listData = this.props.store.list.data;
        let i = 1;
        for (let item in listData) {
            let temp = this.state.data;
            let myTemp = this.state.myData;

            let dataObj = {};
            dataObj.key = i;
            dataObj._id = listData[item]._id;
            dataObj.location = listData[item].location;
            dataObj.fare = listData[item].fare;
            dataObj.children = [
                {
                    key: timeStamp/1000+i,
                    time: 'Email',
                    location: 'WeChat',
                    fare: 'Phone',
                }, {
                    key: timeStamp/10000+i,
                    time: listData[item].author,
                    location: listData[item].wechat,
                    fare: listData[item].phone,
                }
            ];
            console.log(dataObj.children)
            let tempDate = listData[item].date;
            let tempTime = listData[item].time;
            tempDate = listData[item].date.substring(4,11);
            tempTime = listData[item].time.substring(16,21);
            dataObj.time = tempDate + ' - ' + tempTime;
            temp.push(dataObj);
            if (dataObj.children[1].time == user) {
                myTemp.push(dataObj);
            }
            this.setState({data: temp});
            this.setState({myData: myTemp});
            i++;
        }
        let myTemp = this.state.myData;
        myTemp.map((item) => {
            delete item['children'];
        });
        this.setState({myData: myTemp});
    }

    deleteList(event) {
        let DelDataSource = this.state.myData;
        const dataToDel = DelDataSource[event.target.getAttribute('data-index')];
        console.log('delete!!!!!',dataToDel, DelDataSource,event.target.getAttribute('data-index'));
        this.props.dispatch(deleteListing(dataToDel._id));

        DelDataSource.splice(event.target.getAttribute('data-index'), 1);
        this.reload();
        this.reload();
        this.setState({
            myData: DelDataSource,
        });
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
    mylists() {
        this.setState({listall: false})
    }
    alllists() {
        this.setState({listall: true})
    }
    render() {
        let fareColTitle, sorterfn, renderfn;
        if (this.state.listall) {
            fareColTitle = 'Fare';
            sorterfn = function(a, b) {a.fare - b.fare};
            renderfn = null;
        } else {
            fareColTitle = 'Delete';
            sorterfn = null;
            renderfn = (text, record, index) => {
                return <Icon type="delete" data-index={index} onClick={this.deleteList.bind(this)} />;
            }
        }

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
            sorter: (a, b) => {
                if (typeof a.time == 'string') {
                    return a.time.localeCompare(b.time)
                }
                else {
                    return true;
                }
            }
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
            title: fareColTitle,
            dataIndex: 'fare',
            key: 'fare',
            sorter: (a,b) => a.fare - b.fare,
            render: renderfn
        }];

        // console.log(this.state.data, this.state.myData);
        const tableLocale = {
            emptyText: 'Click reload above to fetch data',
        }
        let listOpt;
        if (this.state.listall) {
            listOpt = <Table locale={tableLocale} columns={columns} dataSource={this.state.data} />;
        } else {
            listOpt = <Table locale={tableLocale} columns={columns} dataSource={this.state.myData} />;
        }

        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item><a onClick={this.mylists.bind(this)}>My Lists</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a onClick={this.alllists.bind(this)}>All Lists</a></Breadcrumb.Item>
                </Breadcrumb>

                <div>
                    <Icon style={{fontSize: '14px', color: 'rgb(0, 188, 212)'}}
                          type="reload"
                          onClick={this.reload.bind(this)} />
                    <FlatButton
                        style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
                        label="Clear Search and Reload"
                        primary={true}
                        onClick={this.reload.bind(this)}
                    />
                </div>
                {listOpt}
            </div>
        )

    }
}