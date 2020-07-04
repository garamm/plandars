import React from 'react';
import './Calendar.css';

class Calendar extends React.Component {

    state = { text: '' };

    onUpdatePick = e => {
        e.preventDefault();
        this.props.onUpdatePick(this.state.text);
    }

    render() {
        return (
            <div className="Calendar">
                {this.props.pickMonth}<br />
                <input
                    value={this.state.text}
                    onChange={(e) => { this.setState({ text: e.target.value }) }} />
                <button onClick={this.onUpdatePick}>ttttt</button>
            </div>
        );
    }
}

export default Calendar;