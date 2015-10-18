var hapi = require('hapi');
var request = require('request');

// NOTE: Declare host and port
var host = (process.env
  .VCAP_APP_HOST || 'localhost');
var port = (process.env
  .VCAP_APP_PORT || 1314);

var server = new hapi.Server();

server.connection({
  host: host,
  port: port,
});

var minerva = require('./modulas/minerva');

server.route({
  method: 'POST',
  path: '/question',
  handler: function(req, reply) {
    var question = req.payload.Body;
    var options = minerva.options(question);

    request(options, function(error, response, body) {
      reply(body);
    });
  }
});

server.start(function() {
  console.log('Hapi on ' + host + ':' + port);
});
