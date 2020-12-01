var express = require('express');
var router = express.Router();

// json 관련 모듈
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// // MySQL 관련 모듈
// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'db-4t74d.pub-cdb.ntruss.com',
//     port: 3306,
//     user: 'together_hanul',
//     password: 'hanul_9494@',
//     database: 'together'
// });


// 다른 서버에 POST, GET 요청 관련 모듈
var request = require('request');

//### API ###//

// get 예시
router.get('/', function (req, res, next) {
    res.send('get : ' + req.query.test);
});

// post 예시
router.post('/', function (req, res, next) {
    res.send('post : ' + req.body.test);
});
/*
// DB 예시
router.get('/db', function (req, res, next) {
    console.log("1");

    connection.connect();

    connection.query('SELECT * from pickup_info', (error, rows, fields) => {
        var jsonObj = new Object();
        if (error) {
            jsonObj.resultCode = 400;
            jsonObj.resultMsg = "조회 실패";
        } else {
            jsonObj.resultCode = 200;
            jsonObj.resultMsg = "조회 성공";
            jsonObj.resultData = rows;
        }
        res.send(JSON.stringify(jsonObj));
    });

    connection.end();
});

// request 예시
router.get('/req/get', function (req, res, next) {
    var getUrl = "http://114.207.112.42:5455/amt?program_code=together&user_id=garam";
    request.get({
        url: getUrl
    }, function(error, response, body) {
        res.send(JSON.parse(body));
    });
});

router.post('/req/post', function (req, res, next) {
    var postUrl = "http://106.10.53.206:8083/together/send";
    var postData = {
        token: "eNAFqn2RSh-6pGkXLeMHkv:APA91bHMY21WusuShhjX2vek9E0ze3QqQgYd0j3C32AXY-XfdB82KD0yjEI_Pd7tVEB4SPXzX2P_kHOIB57_o7T2evVH7UU7Ti0qqxGquoPwKyHFBcVQRB2jilOkNfoUgBqZMSXTOaKW",
        title: "title",
        body: "msg"
    };
    request.post({
        headers: {'Content-type': 'application/json'},
        url: postUrl,
        form: postData,
        json: true
    }, function(error, response, body) {
        res.json(body);
    });
});

*/
module.exports = router;
