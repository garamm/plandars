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

// 일정 리스트 조회
router.get('/', function (req, res, next) {
	res.header("Content-Type", 'application/json');
	var u_id = req.query.u_id;
	
	var select = "SELECT * FROM tb_schedule s LEFT JOIN tb_category c ON s.c_id=c.c_id WHERE s.u_id='"+u_id+"'" ;
   connection.query(select, (error, rows, fields) => {
		var jsonObj = new Object();
		if (error) {
			jsonObj.resultCode = 400;
			jsonObj.resultMsg = "일정 조회 실패 : "+error;
		} else {
			jsonObj.resultCode = 200
			jsonObj.resultMsg = "일정 조회 성공";
			jsonObj.resultData = rows;
		}
		res.send(JSON.stringify(jsonObj));
	});
});



module.exports = router;
