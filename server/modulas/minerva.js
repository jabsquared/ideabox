/*
  Minerva
  Goddess of wisdom and sponsor of arts, trade, and strategy.
*/

"use strict";

var request = require('request');

var secret = require('./hekate')
  .auth.cti;

var watson = require('watson-developer-cloud');

if (secret.url !== 'lab') {
  var ci = watson.concept_insights({
    username: secret.usn,
    password: secret.pwd,
    version: 'v2'
  });
  // console.log('Watson COOL!');
}

var params = {
  graph: '/graphs/wikipedia/en-20120601',
  concept: 'Banana',
  level: 0,
  limit: 9
};

var params = {
  graph: '/graphs/wikipedia/en-20120601',
  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

// Retrieve the concepts for input text

exports.getConcepts = function(concept, limit, callback) {
  //v2/graphs/wikipedia/en-20120601/concepts/Banana/related_concepts?level=0&limit=10
  var url = secret.url + '/v2/graphs/wikipedia/en-20120601/concepts/' + concept + '/related_concepts?level=0&limit=' + limit;

  request({
    url: url,
    method: 'GET',
    auth: {
      'user': secret.usn,
      'password': secret.pwd
    },
  }, function(error, response, body) {
    callback(body);
  });
  // ci.graphs.getRelatedConcepts(params, function(err, res) {
  //   if (err) {
  //     return console.log('RELATED CONCEPT:' + err);
  //   }
  //   console.log('GET CONCEPTS WORK!');
  //   callback(res);
  // });
};
