import React from 'react';
import WeekItem from './WeekList.js';

class WeekList extends React.Component {
	render() {
		return (
			<div>
				{this.props.weekDate}
				{this.props.list.map((item, i) => {
					return (
						<WeekItem
							className="WeekList"
							key={i} weekDate={this.props.weekDate} sid={item.sid} title={item.title}
							cid={item.cid} gid={item.gid}  start={item.start} end={item.end}
							lunar={item.lunar} type={item.type} chk={item.chk} memo={item.memo}
							addr={item.addr} lat={item.lat} lon={item.lon} rest={item.rest}
						/>
					);
				})}
				
			</div>
			
		);
	}
}
export default WeekList;