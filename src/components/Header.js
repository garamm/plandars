import React, { Component } from 'react';
import '../styles/header.css';

export default class Header extends Component {

    constructor() {
        super();

        this.state = {
            thisMonth: ""
        }
    }

    componentDidMount() {

        var date = new Date(); 
        var year = date.getFullYear(); 
        var month = new String(date.getMonth()+1); 

        this.setState({thisMonth: year+"년 "+month+"월"});
    }


    render() {
        return (
            <div className="background flex_row">

                <span className="view_pc_tab flex_1">Plandars</span>

                <span className="view_m flex_1">
                    <span className="pointer"><i className="fas fa-chevron-left"></i></span>
                    &nbsp;&nbsp;
                    <span className="pointer">{this.state.thisMonth}</span>
                    &nbsp;&nbsp;
                    <span className="pointer"><i className="fas fa-chevron-right"></i></span>
                </span>
                
                <div className="view_pc_tab">
                    <a className="pointer">WEEK</a>&nbsp;/&nbsp;<a className="pointer">MONTH</a>
                </div>

                <div className="view_m">
                    <a className="pointer">W</a>
                </div>
                                
                <span className="header_margin pointer"><i className="fas fa-cog"></i></span>
                <span className="header_margin pointer"><i className="fas fa-sign-out-alt"></i></span>
            </div>
        );
    };

}