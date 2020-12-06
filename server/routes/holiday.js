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


router.get('/del', function (req, res, next) {
    connection.query("DELETE FROM tb_holiday", (error, rows, fields) => {
        var jsonObj = new Object();
        if (error) {
            jsonObj.resultCode = 400;
            jsonObj.resultMsg = "기본 휴일 삭제 실패 : "+error;
        } else {
        	jsonObj.resultCode = 200;
            jsonObj.resultMsg = "기본 휴일 삭제 성공 : "+error;
        }
		res.send(JSON.stringify(jsonObj));
    });
});

router.get('/fixed', function (req, res, next) {
	var insert = "INSERT INTO tb_holiday VALUES";
	for(var i=2020; i<=2050; i++) {
		if(i==2020) {
			insert += "('새해', '00000001', '"+i+"-01-01', '"+i+"-01-01', 'N', 'Y')";
		} else {
			insert += ",('새해', '00000001', '"+i+"-01-01', '"+i+"-01-01', 'N', 'Y')";
		}
		insert += ",('삼일절', '00000001', '"+i+"-03-01', '"+i+"-03-01', 'N', 'Y')";
		insert += ",('근로자의날', '00000001', '"+i+"-05-01', '"+i+"-05-01', 'N', 'N')";
		insert += ",('어린이날', '00000001', '"+i+"-05-05', '"+i+"-05-05', 'N', 'Y')";
		insert += ",('현충일', '00000001', '"+i+"-06-06', '"+i+"-06-06', 'N', 'Y')";
		insert += ",('광복절', '00000001', '"+i+"-08-15', '"+i+"-08-15', 'N', 'Y')";
		insert += ",('개천절', '00000001', '"+i+"-10-03', '"+i+"-10-03', 'N', 'Y')";
		insert += ",('한글날', '00000001', '"+i+"-10-09', '"+i+"-10-09', 'N', 'Y')";
		insert += ",('성탄절', '00000001', '"+i+"-12-25', '"+i+"-12-25', 'N', 'Y')";
	}
	
    connection.query(insert, (error, rows, fields) => {
        var jsonObj = new Object();
        if (error) {
            jsonObj.resultCode = 400;
            jsonObj.resultMsg = "기본 휴일 추가 실패 : "+error;
        } else {
        	jsonObj.resultCode = 200
            jsonObj.resultMsg = "기본 휴일 추가 성공 : "+error;
        }
		res.send(JSON.stringify(jsonObj));
    });
});

// 추가
// 설날
// 부처님오신날
// 선거
// 추석
// 대체공휴일들
router.get('/added', function (req, res, next) {
	
   
});
module.exports = router;
