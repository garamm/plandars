import React from 'react';

class WeekItem extends React.Component {
	render() {
		return (
			<div>
				{this.props.weekDate}
			</div>
			
		);
	}
}
export default WeekItem;