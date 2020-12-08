import { CHANGE_CONTENT, CHANGE_DATE, MOVE_DATE, UPDATE_PLIST } from '../actions';
import { combineReducers } from 'redux';

const counterInitialState = {
	baseURL: "https://plandars-api.run.goorm.io",
	pList: [], // 일정 리스트
	wList: [], // 주
	mList: [], // 월
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
	return dates;
}

function changeDate(state, action) {
	var dateObj = new Date(action.date);
	var weekObj = setToSunday(new Date(action.date));
	return Object.assign({}, state, {
		date: action.date,
		week: Math.ceil(weekObj.getDate() / 7),
		day: weeks[dateObj.getDay()],
		wList: getWeekList(dateObj)
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
		day: weeks[dateObj.getDay()],
		wList: getWeekList(dateObj)
	});
}

function changeMode(state, action) {
	var dateObj = new Date();
	
	let year = dateObj.getFullYear();
	let month = make2digit(dateObj.getMonth() + 1);
	let dateStr = make2digit(dateObj.getDate());
	
	var weekObj = setToSunday(new Date());
	
	return Object.assign({}, state, {
		date: year+"-"+month+"-"+dateStr,
		week: Math.ceil(weekObj.getDate() / 7),
		day: weeks[dateObj.getDay()],
		contentType: action.contentType,
		wList: getWeekList(dateObj)
	});
}

function getWeekList(date) {
	var currentDay = new Date(date);  
	var theYear = currentDay.getFullYear();
	var theMonth = currentDay.getMonth();
	var theDate  = currentDay.getDate();
	var theDayOfWeek = currentDay.getDay();

	var thisWeek = [];

	for(var i=0; i<7; i++) {
		var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
		var yyyy = resultDay.getFullYear();
		var mm = Number(resultDay.getMonth()) + 1;
		var dd = resultDay.getDate();

		mm = String(mm).length === 1 ? '0' + mm : mm;
		dd = String(dd).length === 1 ? '0' + dd : dd;

		thisWeek.push({
			weekDate: yyyy + '-' + mm + '-' + dd
		})
		
			// key={i} idx={i} sid={item.sid} title={item.title}
						// 	cid={item.cid} gid={item.gid}  start={item.start} end={item.end}
						// 	lunar={item.lunar} type={item.type} chk={item.chk} memo={item.memo}
						// 	addr={item.addr} lat={item.lat} lon={item.lon} rest={item.rest}
	}
	
	console.log(thisWeek);

	return thisWeek;
}


const counter = (state = counterInitialState, action) => {	
    switch(action.type) {
		case CHANGE_CONTENT: // 오늘 날짜로 초기화 후 모드 변경
			return changeMode(state, action);
		case CHANGE_DATE:	
			return changeDate(state, action);
		case MOVE_DATE:
			return moveDate(state, action);
		case UPDATE_PLIST:
			return Object.assign({}, state, {
				pList: action.data,
				wList: getWeekList(new Date(action.data))
			});
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