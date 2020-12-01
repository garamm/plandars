var express = require('express');
var router = express.Router();

// json 관련 모듈
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// MySQL 관련 모듈
const mysql = require('mysql');
const connection = mysql.createConnection({
	connectionLimit: 10 ,
    acquireTimeout: 30000 ,  // 30 초 
    host: '0.0.0.0',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'plandars',
    multipleStatements: true
});

router.get('/default', function (req, res, next) {
    connection.query('SELECT * from tb_category', (error, rows, fields) => {
        var jsonObj = new Object();
        if (error) {
            jsonObj.resultCode = 400;
            jsonObj.resultMsg = "조회 실패 : "+error;
        } else {
            jsonObj.resultCode = 200;
            jsonObj.resultMsg = "조회 성공";
            jsonObj.resultData = rows;
        }
        res.send(JSON.stringify(jsonObj));
    });
});


module.exports = router;
