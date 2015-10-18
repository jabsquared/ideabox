String.prototype.capitalize = function() {
  return this.toLowerCase()
    .replace(/\b\w/g, function(m) {
      return m.toUpperCase();
    });
};

function recapData(data) {
  // body...
  for (var i = 0; i < data.concepts.length; i++) {
    data.concepts[i].concept = data.concepts[i].concept.label;
    data.concepts[i].group = data.concepts[0].concept;
  }
  return data;
}
var userData;

$(document)
  .ready(function() {
    var word;
    $('#submit-btn')
      .click(function() {
        // console.log("Click!");
        word = $('#word')
          .val();

        $.get("https://ideabox.mybluemix.net/p/" +
          word.capitalize()
          .split(' ')
          .join('_'),
          function(data) {
            // data = JSON.parse(data);
            // console.log(JSON.parse(data));
            var js = JSON.parse(data);
            console.log(js);
            if (!js.error) {
              js = recapData(js);
              if (!userData) {
                userData = js;
              } else {
                userData.concepts = userData.concepts.concat(js.concepts);
              }
              render(userData);
            } else {
              alert("NOT FOUND!");
            }
          });
      });
  });


$(document.body)
  .delegate('input:text', 'keypress', function(e) {
    if (e.which === 13) { // if is enter
      e.preventDefault(); // don't submit form
      var word;
      // do what you want here

      // console.log("Click!");
      word = $('#word')
        .val();

      $.get("https://ideabox.mybluemix.net/p/" +

        word.capitalize()
        .split(' ')
        .join('_'),
        function(data) {
          // data = JSON.parse(data);
          // console.log(JSON.parse(data));
          var js = JSON.parse(data);
          console.log(js);
          if (!js.error) {
            js = recapData(js);
            if (!userData) {
              userData = js;
            } else {
              userData.concepts = userData.concepts.concat(js.concepts);
            }
            render(userData);
          } else {
            alert("NOT FOUND!");
          }
        });
    };
  });
