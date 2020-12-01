import Header from '../components/Header.js';
import Menu from '../components/Menu.js';
import Content from '../components/Content.js';

import React from 'react';
import { connect } from 'react-redux';
import { setSelectedDate } from '../actions';

function make2digit(value) {
	if(Number(value) < 10) {
		return "0"+value;
	} else {
		return value;
	}
}

class Home extends React.Component {	
	
	componentDidMount() {
		let today = new Date();
		let year = today.getFullYear();
		let month = make2digit(today.getMonth() + 1);
		let date = make2digit(today.getDate());
		this.props.setSelectedDate(year+"-"+month+"-"+date);
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
		day: state.counter.day
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        setSelectedDate: (value) => dispatch(setSelectedDate(value))
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
