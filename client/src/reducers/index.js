import { CHANGE_CONTENT, CHANGE_DATE, MOVE_DATE, UPDATE_PLIST } from '../actions';
import { combineReducers } from 'redux';

const counterInitialState = {
	baseURL: "http://localhost:4000",
	pList: [], // 일정 리스트
	wList: [], // 주
	mList: [], // 월
    value: 0,
    diff: 1,
	contentType: 'week',
	date: '2020-12-01',
	dateTitle: "",
};

function make2digit(value) {
	if(Number(value) < 10) {
		return "0"+value;
	} else {
		return value;
	}
}

function getSunday(dates) {
	var days = dates.getDay();
	dates.setDate(dates.getDate() - days);
	return dates;
}

function findMonthStr(dateStr) { // 해당일이 몇년 몇월인지 확인
    var splits = dateStr.split("-");
    return splits[0]+"년 " + Number(splits[1])+"월";
}

function findWeekStr(dateStr) { // 해당일이 몇년 몇월 몇째주인지 확인
    var splits = dateStr.split("-");
    var dateObj = new Date(dateStr);
    return splits[0]+"년 " + Number(splits[1])+"월 " + Math.ceil(dateObj.getDate() / 7)+"째주";
}


function makeDateStr(dateObj) {
    let year = dateObj.getFullYear();
	let month = make2digit(dateObj.getMonth() + 1);
	let date = make2digit(dateObj.getDate());
	return year+"-"+month+"-"+date;
}


function changeDate(state, action) {
	console.log("changeDate");
	var dateObj = new Date(action.date);
	var title = "";
	if(state.contentType === "week") {
	    title = findWeekStr(makeDateStr(getSunday(new Date(action.date))));
	} else  if(state.contentType === "month") {
	    title = findMonthStr(makeDateStr(dateObj));
	}

	return Object.assign({}, state, {
		date: action.date,
		dateTitle: title,
		wList: getWeekList(state, dateObj, null),
		mList: getMonthList(state, dateObj, null),
	});
}

function moveDate(state, action) {
	console.log("moveDate");
	var dateObj = null;
	if(state.contentType === "week") {
		dateObj = getSunday(new Date(state.date));
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

    var title = "";
    if(state.contentType === "week") {
		title = findWeekStr(makeDateStr(getSunday(dateObj)));
    } else  if(state.contentType === "month") {
        title = findMonthStr(makeDateStr(dateObj));
    }

	return Object.assign({}, state, {
		date: makeDateStr(dateObj),
		dateTitle: title,
		wList: getWeekList(state, dateObj, null),
		mList: getMonthList(state, dateObj, null)
	});
}

function changeMode(state, action) {
	console.log("changeMode");
	var dateObj = new Date();

	var title = "";
    if(action.contentType === "week") {
        title = findWeekStr(makeDateStr(getSunday(dateObj)));
    } else  if(action.contentType === "month") {
        title = findMonthStr(makeDateStr(dateObj));
    }
	
	return Object.assign({}, state, {
		date: makeDateStr(dateObj),
		dateTitle: title,
		contentType: action.contentType,
		wList: getWeekList(state, dateObj, null),
		mList: getMonthList(state, dateObj, null)
	});
}

function getWeekList(state, date, plistData) {
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
		var weekDate = yyyy + '-' + mm + '-' + dd;

		// 일정추가
		var list = [];
		var loopList;
		if(plistData === null) {
			loopList = state.pList;
		} else {
			loopList = plistData;
		}
		for(var j=0; j<loopList.length; j++) {
			var item = loopList[j];
			if(item.start === weekDate) {
				list.push(item);
			}
		}
		thisWeek.push({
			weekDate: weekDate,
			list: list
		})
	}
	
	return thisWeek;
}
//# 월간 달력 그리기 작업중
function getMonthList(state, date, plistData) {
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
		var monthDate = yyyy + '-' + mm + '-' + dd;

		// 일정추가
		var list = [];
		var loopList;
		if(plistData === null) {
			loopList = state.pList;
		} else {
			loopList = plistData;
		}
		for(var j=0; j<loopList.length; j++) {
			var item = loopList[j];
			if(item.start === monthDate) {
				list.push(item);
			}
		}
		thisMonth.push({
			monthDate: monthDate,
			list: list
		})
	}
	
	return thisMonth;
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
				wList: getWeekList(state, new Date(state.date), action.data),
				mList: getMonthList(state, new Date(state.date), action.data)
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