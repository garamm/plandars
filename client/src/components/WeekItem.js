import '../styles/WeekItem.css';
import React from 'react';

class WeekItem extends React.Component {
	render() {
		return (
			<li calssName="WeekItem">{this.props.idx} {this.props.title}</li>
		);
	}
}
export default WeekItem;