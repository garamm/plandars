var express = require('express');
var router = express.Router();

// json 관련 모듈
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// MySQL 관련 모듈
const mysql = require('mysql');
const dbconfig = require('./config/db.js');
const connection = mysql.createConnection(dbconfig);

// 다른 서버에 POST, GET 요청 관련 모듈
var request = require('request');

// 음력모듈 추가
const LunarCalendar = require('./util/LunarCalendar.js');


router.get('/rm', function (req, res, next) {
    connection.query("DELETE FROM tb_holiday", (error, rows, fields) => {
        var jsonObj = new Object();
        if (error) {
            jsonObj.resultCode = 400;
            jsonObj.resultMsg = "기본 휴일 삭제 실패 : "+error;
        } else {
        	jsonObj.resultCode = 200;
            jsonObj.resultMsg = "기본 휴일 삭제 성공";
        }
		res.send(JSON.stringify(jsonObj));
    });
});




router.get('/add', function (req, res, next) {
	var insert = "INSERT INTO tb_holiday VALUES";
	for(var i=2020; i<=2043; i++) {

		if(i==2020) {
			insert += "('새해', '00000001', '"+i+"-01-01', '"+i+"-01-01', '', 'Y')";
		} else {
			insert += ",('새해', '00000001', '"+i+"-01-01', '"+i+"-01-01', '', 'Y')";
		}
		insert += ",('삼일절', '00000001', '"+i+"-03-01', '"+i+"-03-01', '', 'Y')";
		insert += ",('근로자의날', '00000001', '"+i+"-05-01', '"+i+"-05-01', '', 'N')";
		insert += ",('어린이날', '00000001', '"+i+"-05-05', '"+i+"-05-05', '', 'Y')";
		insert += ",('현충일', '00000001', '"+i+"-06-06', '"+i+"-06-06', '', 'Y')";
		insert += ",('광복절', '00000001', '"+i+"-08-15', '"+i+"-08-15', '', 'Y')";
		insert += ",('개천절', '00000001', '"+i+"-10-03', '"+i+"-10-03', '', 'Y')";
		insert += ",('한글날', '00000001', '"+i+"-10-09', '"+i+"-10-09', '', 'Y')";
		insert += ",('성탄절', '00000001', '"+i+"-12-25', '"+i+"-12-25', '', 'Y')";
		
		// 석가탄신일(음력 4월 8일) 추가
		insert += ",('석가탄신일', '00000001', '"+i+"-"+LunarCalendar.lunarToSolar(i+'0408')+"', '"+i+"-"+LunarCalendar.lunarToSolar(i+'0408')+"', '0408', 'Y')";

		// 설날(음력 1월 1일과 전후 이틀) 추가
		var newYearStr = i+"-"+LunarCalendar.lunarToSolar(i+'0101');
		var newYearDate = new Date(newYearStr);
		var prevNewYearStr = LunarCalendar.getFormatDate(newYearDate.setDate(newYearDate.getDate() - 1));
		var nextNewYearStr = LunarCalendar.getFormatDate(newYearDate.setDate(newYearDate.getDate() + 2));
		insert += ",('설날연휴', '00000001', '"+prevNewYearStr+"', '"+prevNewYearStr+"', '0101', 'Y')";
		insert += ",('설날', '00000001', '"+newYearStr+"', '"+newYearStr+"', '0101', 'Y')";
		insert += ",('설날연휴', '00000001', '"+nextNewYearStr+"', '"+nextNewYearStr+"', '0101', 'Y')";
		
		
		// 추석(음력 8월 15일과 전후 이틀) 추가
		var chuseokStr = i+"-"+LunarCalendar.lunarToSolar(i+'0815');
		var chuseokDate = new Date(chuseokStr);
		var prevChuseokStr = LunarCalendar.getFormatDate(chuseokDate.setDate(chuseokDate.getDate() - 1));
		var nextChuseokStr = LunarCalendar.getFormatDate(chuseokDate.setDate(chuseokDate.getDate() + 2));
		insert += ",('추석연휴', '00000001', '"+prevChuseokStr+"', '"+prevChuseokStr+"', '0815', 'Y')";
		insert += ",('추석', '00000001', '"+chuseokStr+"', '"+chuseokStr+"', '0815', 'Y')";
		insert += ",('추석연휴', '00000001', '"+nextChuseokStr+"', '"+nextChuseokStr+"', '0815', 'Y')";
		
		
		// 대체공휴일 정의
		// 설·추석 연휴는 다른 공휴일과 겹치는 경우 그 날 다음의 첫 번째 비공휴일을 공휴일로 하고
		// 어린이날은 토요일 또는 다른 공휴일과 겹치는 경우 그 날 다음의 첫 번째 비공휴일을 공휴일로 한다.
		// 단, 어린이날 외의 토요일은 대체공휴일에 포함되지 않는다
		
		// 어린이날 대체공휴일 확인 및 추가
		var week = ['일', '월', '화', '수', '목', '금', '토'];
		
		var childrensDay = new Date(i+"-05-05");
		var childrensWeek = week[new Date('2016-07-28').getDay()];
		if(childrensWeek == '토') {
			childrensDay.setDate(childrensDay.getDate() + 2);
			insert += ",('대체공휴일', '00000001', '"+LunarCalendar.getFormatDate(childrensDay)+"', '"+LunarCalendar.getFormatDate(childrensDay)+"', '', 'Y')";
		} else if(childrensWeek == '일') {
			childrensDay.setDate(childrensDay.getDate() + 2);
			insert += ",('대체공휴일', '00000001', '"+LunarCalendar.getFormatDate(childrensDay)+"', '"+LunarCalendar.getFormatDate(childrensDay)+"', '', 'Y')";
		}
		
		
		// 설날 대체공휴일 확인 및 추가
		var newYear1 = week[new Date(prevNewYearStr).getDay()];
		var newYear2 = week[new Date(newYearStr).getDay()];
		var newYear3 = week[new Date(nextNewYearStr).getDay()];
		if(newYear1 == '일' || newYear2 == '일' || newYear3 == '일') {
			var newYears = new Date(nextNewYearStr)
			newYears.setDate(newYears.getDate() + 1);
			insert += ",('대체공휴일', '00000001', '"+LunarCalendar.getFormatDate(newYears)+"', '"+LunarCalendar.getFormatDate(newYears)+"', '', 'Y')";
		}
		
		// 추석 대체공휴일 확인 및 추가 (개천절이랑 겹치는지도 확인)
		var chuseok = week[new Date(chuseokStr).getDay()];
		if(chuseok == '일' || chuseokStr == i+'-10-03') {
			var chuseoks = new Date(nextChuseokStr)
			chuseoks.setDate(chuseoks.getDate() + 1);
			insert += ",('대체공휴일', '00000001', '"+LunarCalendar.getFormatDate(chuseoks)+"', '"+LunarCalendar.getFormatDate(chuseoks)+"', '', 'Y')";
		}
	}
	
    connection.query(insert, (error, rows, fields) => {
        var jsonObj = new Object();
        if (error) {
            jsonObj.resultCode = 400;
            jsonObj.resultMsg = "기본 휴일 추가 실패 : "+error;
        } else {
        	jsonObj.resultCode = 200
            jsonObj.resultMsg = "기본 휴일 추가 성공";
        }
		res.send(JSON.stringify(jsonObj));
    });
});


// 선거데이터 REST로 받아온 후 추가
// REST 추가 : 보궐선거를 제외한 각종 선거투표일 등 정부에서 수시로 정하는 날
router.get('/added', function (req, res, next) {
	// for(var i=2020; i<)
	// var getUrl = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?ServiceKey=NNEiSs6S4gSZ53WNNaEdcnmpKzsmViAlWpzBuCVDG%2FFrmgz%2FviBW5sNYD9w1fUpGh6DZyUo7zr1q6ldKKozLYg%3D%3D&pageNo=1&numOfRows=50&solYear=2020&solMonth=01";
	// request.get({
	// url: getUrl
	// }, function(error, response, body) {
	// res.send(JSON.parse(body));
	// });
   
});


// 연휴 리스트 조회
router.get('/', function (req, res, next) {
	res.header("Content-Type", 'application/json');
	//var select = "SELECT * FROM tb_holiday WHERE h_start LIKE ('"+req.query.year+"-%')";
	var select = "SELECT * FROM tb_holiday";
   connection.query(select, (error, rows, fields) => {
		var jsonObj = new Object();
		if (error) {
			jsonObj.resultCode = 400;
			jsonObj.resultMsg = "휴일 조회 실패 : "+error;
		} else {
			jsonObj.resultCode = 200
			jsonObj.resultMsg = "휴일 조회 성공";
			jsonObj.resultData = rows;
		}
		res.send(JSON.stringify(jsonObj));
	});
});



module.exports = router;
