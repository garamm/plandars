import React from 'react';

class WeekItem extends React.Component {

	render() {
		return (
			<div>
				<p style={{marginTop: 0, marginBottom: 3}}>{this.props.weekDate}</p>
				{this.props.list.map((item, i) => {
                    if(item.type === "일정") {
                        return (
                            <span key="i" className="weekWidth planFont" style={{marginRight: 5, backgroundColor: item.ccolor, color: item.ctcolor, borderRadius: item.cradius}} >{item.title}</span>
                        );
                    } else if(item.type === "체크") {
                        if(item.chk === "Y") {
                            return (
                                <span key="i" className="weekWidth planFont checkDone" style={{marginRight: 5, backgroundColor: 'white', color: item.ccolor}} >{item.title}</span>
                            );
                        } else {
                            return (
                                <span key="i" className="weekWidth planFont" style={{marginRight: 5, backgroundColor: 'white', color: item.ccolor}} >{item.title}</span>
                            );
                        }
                        
                    } else {
                        return (null);
                    }					
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