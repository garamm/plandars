import React from 'react';
import '../styles/Month.css';

class MonthItem extends React.Component {

	render() {
		return (
			<div className="MonthItem">
				{this.props.weekList.map((item, j) => {
					return (
						<div className={(item.type==='this' ? 'WeekItem' : 'WeekItem add_opacity')} key={j}>							
							<p style={{ margin: 5, color: item.isHoliday ? 'red' : ''  }}>{Number(item.monthDate.substr(8, 2))}</p>
							{item.list.map((item2, k) => {
								return (
									<p key={k} style={{margin: 5, padding: 3, backgroundColor: item2.ccolor, color: item2.ctcolor, borderRadius: item2.cradius}} >{item2.title}</p>
								);
							})}
							
						</div>
					);
				})}
				
				 {/* monthDate={item.monthDate} list={item.list} type={item.type} */}
				{/* {this.props.monthDate}<br/>
				{this.props.list.map((item, i) => {
					return (
						<span key="i" style={{backgroundColor: item.ccolor, color: item.ctcolor}} >{item.title}</span>
					);
				})} */}
				{/* // weekDate={weekDate} sid={item.sid} title={item.title}
							// cid={item.cid} gid={item.gid}  start={item.start} end={item.end}
							// lunar={item.lunar} type={item.type} chk={item.chk} memo={item.memo}
							// addr={item.addr} lat={item.lat} lon={item.lon} rest={item.rest} */}
			</div>
			
		);
	}
}

export default MonthItem;  