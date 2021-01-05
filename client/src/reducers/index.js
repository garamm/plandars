import { CHANGE_CONTENT, CHANGE_DATE, MOVE_DATE, UPDATE_PLIST, OPEN_DETAILPOPUP } from '../actions';
import { combineReducers } from 'redux';

const counterInitialState = {
	baseURL: "http://13.124.220.147:4000",
	//baseURL: "http://localhost:4000",
	pList: [], // 일정 리스트
	wList: [], // 주
	mList: [], // 월
    value: 0,
    diff: 1,
	contentType: 'month',
	date: '2020-12-01',
	dateTitle: "",
	isOpenDetailPopup: false,
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

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


function changeDate(state, action) {
	console.log("changeDate");
	var dateObj = new Date(action.date);
	var title = "";
	if(state.contentType === "week") {
	    title = findWeekStr(makeDateStr(getSunday(new Date(action.date))));
	} else if(state.contentType === "month") {
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

function getMonthList(state, date, plistData) {
	var currentDay = new Date(date);
	var currentYear = currentDay.getFullYear();
	var currentMonth = currentDay.getMonth();
	
	var dayList = []; // 일자 리스트
	var tempList = []; // 일자+일정 리스트
	var thisMonth = []; // 일자+일정+주별로 자른 리스트

	// 이번달 일정 더하기
    var firstDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
    var prevDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
    var lastDate = new Date(currentDay.getFullYear(), currentDay.getMonth()+1, 0);

    // prev
    var prevCnt = firstDate.getDay()
    for(var i=0; i<prevCnt; i++) {
	  prevDate.setDate(prevDate.getDate() - 1);
	  dayList.push(makeDateStr(prevDate));
    }
    
    for(var j=1; j<=lastDate.getDate(); j++) {
	  dayList.push(currentYear+"-"+make2digit(currentMonth+1)+"-"+make2digit(j));
    }
    
    // next
    var nextCnt = 6 - lastDate.getDay();
    for(var k=0; k<nextCnt; k++) {
	  lastDate.setDate(lastDate.getDate() + 1);
	  dayList.push(makeDateStr(lastDate));
	}
	dayList.sort(); // 일자 순서대로 정렬

	// 일정추가
	for(var n=0; n<dayList.length; n++) {
		var monthDate = dayList[n];
		var list = [];
		var loopList;
		if(plistData === null) {
			loopList = state.pList;
		} else {
			loopList = plistData;
		}
		var isHoliday = false;
		for(var m=0; m<loopList.length; m++) {
			var item = loopList[m];
			if(item.start === monthDate) {
				list.push(item);
				console.log(item);
				if(item.cid === "00000001" && item.rest === "Y") { // 공휴일 표시
					isHoliday = true;
				}
			}
		}
		var type = "this"; // prev, this, next
		if(monthDate.substr(0,7) < makeDateStr(currentDay).substr(0,7)) {
			type = "prev";
		}
		if(monthDate.substr(0,7) > makeDateStr(currentDay).substr(0,7)) {
			type = "next";
		}

		tempList.push({
			monthDate: monthDate,
			isHoliday: isHoliday,
			type: type,
			list: list
		})
		console.log(tempList);
	}

	// 달력 모양 만들기
	var weekCnt = 6;
	if(tempList.length === 35) { // 이번달이 5주인 경우
		weekCnt = 5;
	}

	for(var o=0; o<weekCnt; o++) {
		thisMonth.push({
			weekNo: o,
			weekList: tempList.slice(o*7, (o+1)*7)
		});
	}

	console.log(thisMonth);	
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
		case OPEN_DETAILPOPUP: 
			return Object.assign({}, state, {
				isOpenDetailPopup: action.isOpen,
				date: action.date
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