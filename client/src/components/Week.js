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
			<div className="Week">
				<ul>
                    {this.state.contactData.map((contact, i) => {
                        return (<WeekItem name={contact.name}
                                            phone={contact.phone}
                                              key={i}/>);
                    })}
                </ul>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		date: state.counter.date,
		week: state.counter.week,
		day: state.counter.day,
	}
}

Week = connect(mapStateToProps)(Week);
export default Week;