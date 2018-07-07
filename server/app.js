var path = require('path');
var http = require('http');
var createError = require('http-errors');
var env = require('dotenv').config({path:path.resolve(__dirname, '../.env')}).parsed;
var express = require('express');
var debug = require('debug')('chatRoom:server');
var socketIO = require('./socket');
var port = normalizePort(env.serverPort || '9000');
const history =  require('express-history-api-fallback');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routes  = require('./routes/index')


var app = express();

app.use(express.static(path.join(__dirname, 'upload')));
//前端单页路由后台拦截设置
const root = path.resolve(__dirname, '../client/dist');
app.use('/chatRoom', history('index.html', { root: path.join(root,'html') }));
/** 下面的设置可以既使得前后端进行分离了，但是还可以同域名的情况下，目录相邻即可
  *  如果要跨域的话，可以将下面的跨域设置给开启
  *  并将JS中的AJAX的跨域设置给开启
  */
if(env.crossDomain === 'false'){
  //设置不跨域访问
  app.use('/chatRoom',express.static(path.join(root,'html')));
  app.use('/bundle',express.static(path.join(root,'bundle')));
  app.use('/assets',express.static(path.join(root,'assets')));
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
}else{
  //设置跨域访问
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", env.AccessControlAllowOrigin+':'+env.clientPort);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials",true);  //跨域Ajax使用
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("rootPath", __dirname);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(env.cookieSecret));

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

