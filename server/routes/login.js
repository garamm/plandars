var express = require('express');
var router = express.Router();

// json 관련 모듈
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
// request 예시
router.get('/req/get', function (req, res, next) {
    var getUrl = "sssssssssssssssssssssss";
    request.get({
        url: getUrl
    }, function(error, response, body) {
        res.send(JSON.parse(body));
    });
});

router.post('/req/post', function (req, res, next) {
    var postUrl = "ssssssssssssssssss";
    var postData = {
        token: "totototoken",
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
