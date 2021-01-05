import '../styles/Month.css';
import React from 'react';
import { connect } from 'react-redux';
import MonthItem from './MonthItem.js';


class Month extends React.Component {
	render() {
		return (
			<div className="Month">
				{this.props.mList.map((item, i) => {
					return (
						<MonthItem
							key={i}
							weekNo={item.weekNo} weekList={item.weekList}
						/>
					);
				})}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		mList: state.counter.mList,
	}
}

Month = connect(mapStateToProps)(Month);
export default Month;