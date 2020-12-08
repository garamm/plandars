import Header from '../components/Header.js';
import Menu from '../components/Menu.js';
import Content from '../components/Content.js';

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSelectedDate, updatePlist } from '../actions';

function make2digit(value) {
	if(Number(value) < 10) {
		return "0"+value;
	} else {
		return value;
	}
}



class Home extends React.Component {	
	
	getHoliday() {
		axios.get(this.props.baseURL + "/holiday", {
			params: {}
		})
		.then( response => {
			if(response.status !== 200) {
				alert("휴일 데이터를 가져올 수 없습니다(1)");
			} else {
				var json = response.data;
				var list = [];
				if(json.resultCode === 200) {
					for(var i=0; i<json.resultData.length; i++) {
						var item = json.resultData[i];
						list.push({
							sid: "", // 휴일은 스케쥴코드 공백
							title: item.h_title,
							cid: item.c_id,
							gid: "", // 휴일은 그룹아이디 공백
							start: item.h_start,
							end: item.h_end,
							lunar: item.h_lunar,
							type: "일정",
							chk: "",
							memo: "",
							addr: "",
							lat: "",
							lon: "",
							rest: item.h_rest // 휴일 YN
						});
					}
					this.props.updatePlist(list);
				} else {
					alert("휴일 데이터를 가져올 수 없습니다.");
				}
			}
		})
		.catch( error => {
			alert("휴일 데이터를 가져올 수 없습니다(2)");
			console.log(error);
		});		
	}

	
	componentDidMount() {
		let today = new Date();
		let year = today.getFullYear();
		let month = make2digit(today.getMonth() + 1);
		let date = make2digit(today.getDate());
		this.props.setSelectedDate(year+"-"+month+"-"+date);
		this.getHoliday();
	}
	
	render() {
        return (
            <div className="App flex_column">
				<Header></Header>
				<div className="flex_1 flex_row app_body">
					<Content className="flex_1"></Content>
					<span className={this.props.contentType === 'month' ? 'v_show' : 'v_hide'} >
						<Menu className="pc_tablet"></Menu>
					</span>
				</div>
			</div>
        );
    }
}



let mapStateToProps = (state) => {
    return {
		contentType: state.counter.contentType,
        date: state.counter.date,
		week: state.counter.week,
		day: state.counter.day,
		baseURL: state.counter.baseURL,
		pList: state.counter.pList,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        setSelectedDate: (value) => dispatch(setSelectedDate(value)),
		updatePlist: (value) => dispatch(updatePlist(value)),
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
