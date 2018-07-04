var path = require('path');
var http = require('http');
var createError = require('http-errors');
var env = require('dotenv').config({path:path.resolve(__dirname, '../.env')}).parsed;
var express = require('express');
var debug = require('debug')('chatRoom:server');
var socketIO = require('./socket');
var port = normalizePort(env.serverPort || '9000');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routes  = require('./routes/index')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("rootPath", __dirname);
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", env.AccessControlAllowOrigin+":"+env.clientPort);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials",true);  //跨域Ajax使用
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(env.cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});


/**
 * Get port from environment and store in Express.
 */
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);
socketIO(server);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
console.log('server is listen on '+port)
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

