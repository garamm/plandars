import '../styles/Week.css';
import React from 'react';
import { connect } from 'react-redux';
import WeekItem from './WeekItem.js';

class Week extends React.Component {
	
	render() {
		return (
			<div className="Week">
				{this.props.wList.map((item, i) => {
					return (
						<WeekItem
							className="WeekItem"
							key={i} weekDate={item.weekDate} list={item.list}
						/>
					);
				})}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		date: state.counter.date,
		week: state.counter.week,
		day: state.counter.day,
		pList: state.counter.pList,
		wList: state.counter.wList,
	}
}

Week = connect(mapStateToProps)(Week);
export default Week;