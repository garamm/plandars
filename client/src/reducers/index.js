import { CHANGE_CONTENT, CHANGE_DATE, MOVE_DATE } from '../actions';
import { combineReducers } from 'redux';

const counterInitialState = {
    value: 0,
    diff: 1,
	contentType: 'month',
	date: '2020-12-01',
	week: 1,
	day: '일',
};
const weeks = ['일', '월', '화', '수', '목', '금', '토'];

function make2digit(value) {
	if(Number(value) < 10) {
		return "0"+value;
	} else {
		return value;
	}
}

function setToSunday(dates) {
	var days = dates.getDay();
	dates.setDate(dates.getDate() - days);
	
	let year = dates.getFullYear();
	let month = make2digit(dates.getMonth() + 1);
	let dateStr = make2digit(dates.getDate());
	console.log(year+"-"+month+"-"+dateStr);
	
	return dates;
}

function changeDate(state, action) {
	var dateObj = new Date(action.date);
	var weekObj = setToSunday(new Date(action.date));
	return Object.assign({}, state, {
		date: action.date,
		week: Math.ceil(weekObj.getDate() / 7),
		day: weeks[dateObj.getDay()]
	});
}

function moveDate(state, action) {
	var dateObj = null;
	if(state.contentType === "week") {
		dateObj = setToSunday(new Date(state.date));
	} else {
		dateObj = new Date(state.date);
	}
	const moveType = action.moveType;
	if(moveType === "prev") {
		if(state.contentType === "month") {
			dateObj.setMonth(dateObj.getMonth() - 1);
		} else if(state.contentType === "week") {
			dateObj.setDate(dateObj.getDate() - 7);
		}
	} else  if(moveType === "next") {
		if(state.contentType === "month") {
			dateObj.setMonth(dateObj.getMonth() + 1);
		} else if(state.contentType === "week") {
			dateObj.setDate(dateObj.getDate() + 7);
		}
	}
	let year = dateObj.getFullYear();
	let month = make2digit(dateObj.getMonth() + 1);
	let date = make2digit(dateObj.getDate());
	var weekObj2 = setToSunday(new Date(dateObj));
	return Object.assign({}, state, {
		date: year+"-"+month+"-"+date,
		week: Math.ceil(weekObj2.getDate() / 7),
		day: weeks[dateObj.getDay()]
	});
}


const counter = (state = counterInitialState, action) => {	
    switch(action.type) {
		case CHANGE_CONTENT:
			if(action.contentType === "week") {
				var newDate = setToSunday(new Date(state.date));
				let year = newDate.getFullYear();
				let month = make2digit(newDate.getMonth() + 1);
				let date = make2digit(newDate.getDate());
				return Object.assign({}, state, {
					date: year+"-"+month+"-"+date,
					week: Math.ceil(newDate.getDate() / 7),
					day: weeks[newDate.getDay()],
					contentType: action.contentType
				});
			} else {
				var nowDate = new Date();
				let year = nowDate.getFullYear();
				let month = make2digit(nowDate.getMonth() + 1);
				let date = make2digit(nowDate.getDate());
				return Object.assign({}, state, {
					date: year+"-"+month+"-"+date,
					week: Math.ceil(nowDate.getDate() / 7),
					day: weeks[nowDate.getDay()],
					contentType: action.contentType
				});
			}
		case CHANGE_DATE:	
			return changeDate(state, action);
		case MOVE_DATE:
			return moveDate(state, action);
        default:
            return state;
    }
};

const extra = (state = { value: 'this_is_extra_reducer' }, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

const counterApp = combineReducers({
    counter,
    extra
});

export default counterApp;