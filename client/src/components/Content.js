import '../styles/Content.css';
import Month from './Month.js';
import Week from './Week.js';

import React from 'react';
import { connect } from 'react-redux';

class Content extends React.Component {
    render() {
        return (
            <div className="Content">
				<div className="flex_row">
					<div className={this.props.contentType === 'month' ? 'v_show' : 'v_hide'}>
						<Month></Month>
					</div>
					<div className={this.props.contentType === 'week' ? 'v_show' : 'v_hide'}>
						<Week></Week>
					</div>
					
					
				</div>
			</div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        contentType: state.counter.contentType
    };
}

Content = connect(mapStateToProps)(Content);

export default Content;
