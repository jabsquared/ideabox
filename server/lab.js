var socketio = require('socket.io');
var restify = require('restify');

var server = restify.createServer();
var io = socketio.listen(server.server);

var minerva = require('./modulas/minerva');

server.use(restify.bodyParser());

server.listen(process.env.VCAP_APP_PORT || 1314, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function postConcept(req, res, next) {
  // body...
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  var concept = req.params.c;

  // Return back a package of related concept with weight
  // request(options, function(error, response, body) {
  //   res.send(200, body);
  // });
  console.log('RUNNING P!');
  console.log(concept);
  minerva.getConcepts(concept, 9, function(r){
    console.log('RUNNING MINERVA');
    console.log(JSON.stringify(r, null, 2));
    res.send(200, r);
  });

}

function infoConcept(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  var concept = req.params.c;
  minerva.getConcept (concept, function(r){
    console.log('RUNNING MINERVA');
    console.log(JSON.stringify(r, null, 2));
    res.send(200, r);
  });
}

server.get('/p/:c', postConcept);

server.get('/i/:c', infoConcept);

io.sockets.on('connection', function(socket) {
  // Define a helper function to return the count.

});
