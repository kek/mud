var express = require('express')
,   routes = require('./routes');
var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

// Socket.IO

app.listen(19000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { news: 'Connected!' });

  socket.on('command', function (data) {
    console.log("Got command:");
    console.log(data);
    input = data.command;
    socket.emit('news', { news: 'You sent the command ' + input });
    socket.broadcast.emit('news', { news: 'Someone sent the command ' + input });
  });

  // socket.on('message', function (data) {
  //   console.log("Got message:");
  //   console.log(data);
  // });
});
