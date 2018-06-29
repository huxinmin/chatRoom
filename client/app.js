const finalhandler = require('finalhandler')
const http = require('http')
const serveStatic = require('serve-static')

// Serve up folder
const serve = serveStatic('./dist', {maxAge: '1d','index': 'index.html'})

// Create server
const server = http.createServer((req, res)=> {
  serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(3000)