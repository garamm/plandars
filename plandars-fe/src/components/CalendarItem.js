import React from 'react';
import './CalendarItem.css';

class CalendarItem extends React.Component {
    
    render() {
        return (
            <div class="CalendarItem">
                {this.props.date.day}
            </div>
        );
    }
}

export default CalendarItem;