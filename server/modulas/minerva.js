/*
  Minerva
  Goddess of wisdom and sponsor of arts, trade, and strategy.
*/

"use strict";

var secret = require('./hekate')
  .auth.qna;

exports.options = function(question) {
  return {
    url: secret.url + '/v1/question/healthcare/',
    method: 'POST',
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
