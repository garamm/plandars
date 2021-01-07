import React from 'react';

class WeekItem extends React.Component {

	render() {
		return (
			<div>
				<p style={{marginTop: 0, marginBottom: 5}}>{this.props.weekDate}</p>
				{this.props.list.map((item, i) => {
					return (
						<span key="i" className="weekWidth" style={{fontSize: 10, padding: 3, backgroundColor: item.ccolor, color: item.ctcolor, borderRadius: item.cradius}} >{item.title}</span>
					);
				})}
				{/* // weekDate={weekDate} sid={item.sid} title={item.title}
							// cid={item.cid} gid={item.gid}  start={item.start} end={item.end}
							// lunar={item.lunar} type={item.type} chk={item.chk} memo={item.memo}
							// addr={item.addr} lat={item.lat} lon={item.lon} rest={item.rest} */}
			</div>
			
		);
	}
}
export default WeekItem;