var socketio = require('socket.io');
var restify = require('restify');
var server = restify.createServer();
var io = socketio.listen(server.server);
var helena = require('./js/helena');
var sideria = require('./js/sideria');

server.listen(process.env.VCAP_APP_PORT || 1314, function() {
  console.log('%s listening at %s', server.name, server.url);
});

io.sockets.on('connection', function(socket) {
  // Define a helper function to return the count.
  var emitCount = function(err, count) {
    if (err || !count) {
      return console.log(err);
    }
    if (count) {
      io.sockets.emit('Population Changed', count);
    }
  };
  socket.on('Image Clicked', function(data) {
    // console.log(data);
    if (!data) {
      sideria.count(emitCount);
      return;
    }
    sideria.countDown(emitCount);
    helena.receive(data);
  });
});
