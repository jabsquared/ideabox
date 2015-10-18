/*
  Minerva
  Goddess of wisdom and sponsor of arts, trade, and strategy.
*/

"use strict";

var secret = require('./hekate')
  .auth.cti;

exports.accounts = function () {
  return {
    url: secret.url + '/v2/accounts',
    method: 'GET',
    headers: {
      'X-synctimeout': '30'
    },
    auth: {
      'user': secret.usn,
      'password': secret.pwd
    },
  };
};

exports.graphs = function(question) {
  return {
    url: secret.url + '/v2/graphs/wikipedia/en-20120601/',
    method: 'GET',
    headers: {
      'X-synctimeout': '30'
    },
    auth: {
      'user': secret.usn,
      'password': secret.pwd
    },
    json: {
      'question': {
        'evidenceRequest': {
          'items': 9 // the number of answers
        },
        'questionText': question,
        'items': 9,
      }
    }
  };
};
