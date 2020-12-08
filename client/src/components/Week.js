import '../styles/Week.css';
import React from 'react';
import { connect } from 'react-redux';
import WeekItem from './WeekItem.js';

class Week extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            contactData: [
                {name: "Abet", phone: "010-0000-0001"},
                {name: "Betty", phone: "010-0000-0002"},
                {name: "Charlie", phone: "010-0000-0003"},
                {name: "David", phone: "010-0000-0004"}
            ]
        };
    }
	
	render() {
		return (
			<ul className="Week">
				{this.props.pList.map((item, i) => {
					return (
						<WeekItem
							idx={i} sid={item.sid} title={item.title}
							cid={item.cid} gid={item.gid}  start={item.start} end={item.end}
							lunar={item.lunar} type={item.type} chk={item.chk} memo={item.memo}
							addr={item.addr} lat={item.lat} lon={item.lon} rest={item.rest}
						/>
					);
				})}
			</ul>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		date: state.counter.date,
		week: state.counter.week,
		day: state.counter.day,
		pList: state.counter.pList,
	}
}

Week = connect(mapStateToProps)(Week);
export default Week;