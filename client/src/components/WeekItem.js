//import '../styles/WeekItem.css';
import React from 'react';

class WeekItem extends React.Component {
	
	render() {
		return (
			<li>{this.props.name} {this.props.phone}</li>
		);
	}
}
export default WeekItem;