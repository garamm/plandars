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

module.exports = router;
