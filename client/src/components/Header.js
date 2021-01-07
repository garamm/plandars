import React from 'react';
import { connect } from 'react-redux';
import { setContentType, moveDate } from '../actions';
import '../styles/Header.css';

class Header extends React.Component {
	
	render() {
		return (
			<div className="Header flex_row">
				<span className="t_title pc_tablet mr_16">Plandars</span>
				<span className="t_title flex_row">
					<button className="t_subtitle rm_btn ic_width" onClick={() => this.props.moveDate('prev') }>
						<img className="t_subtitle c_black d_ib" src="/imgs/ic_prev.svg" alt="ic_prev"></img>
					</button>
					<span className={this.props.contentType === 'month' ? 'v_show' : 'v_hide'} >
						{ this.props.dateTitle }
					</span>
					<span className={this.props.contentType === 'week' ? 'v_show' : 'v_hide'} >
						{ this.props.dateTitle }
					</span>
					<button className="t_subtitle rm_btn ic_width" onClick={() => this.props.moveDate('next') }>
						<img className="t_subtitle c_black d_ib" src="/imgs/ic_next.svg" alt="ic_next"></img>
					</button>
				</span>
				
				<div className="right_content">
					
					<div className="phone float_r flex_row">
						<span className={this.props.contentType === 'week' ? 'ic_show' : 'ic_hide'} >
							<button className="t_subtitle rm_btn ic_width" onClick={() => this.props.setContent('month') }>
								<img className="t_subtitle c_black d_ib" src="/imgs/ic_month.svg" alt="ic_month"></img>
							</button>
						</span>
						<span className={this.props.contentType === 'month' ? 'ic_show' : 'ic_hide'} >
							<button className="t_subtitle rm_btn ic_width" onClick={() => this.props.setContent('week') }>
								<img className="t_subtitle c_black d_ib" src="/imgs/ic_week.svg" alt="ic_week"></img>
							</button>
						</span>
						{/*<span className={this.props.contentType === 'check' ? 'ic_show' : 'ic_hide'} >
							<button className="t_subtitle rm_btn ic_width" onClick={() => this.props.setContent('check') }>
								<img className="t_subtitle c_black d_ib" src="/imgs/ic_check.svg" alt="ic_check"></img>
							</button>
						</span>*/}

						<button className="t_subtitle rm_btn ic_width ic_ml">
							<img className="t_subtitle c_black d_ib" src="/imgs/ic_add.svg" alt="ic_add"></img>
						</button>
						<button className="t_subtitle float_r rm_btn ic_width ic_ml">
							<img className="t_subtitle c_black d_ib" src="/imgs/ic_logout.svg" alt="ic_logout"></img>
						</button>
					</div>
					
					<div className="pc_tablet header_label float_r">
						<button className="t_subtitle rm_btn" onClick={() => this.props.setContent('month') }>월간보기</button>
						<button className="t_subtitle ml_10 rm_btn" onClick={() => this.props.setContent('week') }>주간보기</button>
						<button className="t_subtitle ml_10 rm_btn">카테고리관리</button>
						<button className="t_subtitle float_r rm_btn ic_width">
							<img className="t_subtitle c_black d_ib" src="/imgs/ic_logout.svg" alt="ic_logout"></img>
						</button>
					</div>


				</div>

			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		contentType: state.counter.contentType,
		date: state.counter.date,
		dateTitle: state.counter.dateTitle,
	}
}

let mapDispatchToProps = (dispatch) => {
    return {
        setContent: (value) => dispatch(setContentType(value)),
		moveDate: (value) => dispatch(moveDate(value)),
    }
}

Header = connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;
