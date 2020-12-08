var express = require('express');
var http = require('http');
var app = express();
var cors = require('cors');

var server = http.createServer(app);
var indexRouter = require('./routes/index.js');
var loginRouter = require('./routes/login.js');
var calendarRouter = require('./routes/calendar.js');
var categoryRouter = require('./routes/category.js');
var holidayRouter = require('./routes/holiday.js');

// CORS 설정
app.use(cors());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/calendar', calendarRouter);
app.use('/category', categoryRouter);
app.use('/holiday', holidayRouter);

server.listen(4000, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});

module.exports = indexRouter;
module.exports = loginRouter;
module.exports = calendarRouter;
module.exports = categoryRouter;
module.exports = holidayRouter;
