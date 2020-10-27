var express = require('express');
var http = require('http');
var app = express();

var server = http.createServer(app);
var loginRouter = require('./routes/login.js');
var calendarRouter = require('./routes/calendar.js');
var categoryRouter = require('./routes/category.js');

app.use('/login', loginRouter);
app.use('/calendar', calendarRouter);
app.use('/category', categoryRouter);

server.listen(4000, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});

module.exports = loginRouter;
module.exports = calendarRouter;
module.exports = categoryRouter;
