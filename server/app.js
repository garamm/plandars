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

app.use('/api', indexRouter);
app.use('/api/login', loginRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/category', categoryRouter);
app.use('/api/holiday', holidayRouter);

server.listen(4000, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});

module.exports = indexRouter;
module.exports = loginRouter;
module.exports = calendarRouter;
module.exports = categoryRouter;
module.exports = holidayRouter;
