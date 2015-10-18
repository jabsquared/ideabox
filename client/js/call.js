String.prototype.capitalize = function() {
  return this.toLowerCase()
    .replace(/\b\w/g, function(m) {
      return m.toUpperCase();
    });
};

function recapData(data, group, ne) {
  // body...
  data.connections = [];
  for (var i = ne ? 1 : 0; i < data.concepts.length; i++) {
    data.concepts[i].concept = data.concepts[i].concept.label;
    data.concepts[i].group = group;
    if (group !== data.concepts[i].concept) {
      data.connections[i] = {
        "source": group,
        "target": data.concepts[i].concept,
      }
    }
  }
  return data;
}

function getData(word) {
  // body...

  $.get("https://ideabox.mybluemix.net/p/" +
    word.capitalize()
    .split(' ')
    .join('_'),
    function(data) {
      // data = JSON.parse(data);
      // console.log(JSON.parse(data));
      var js = JSON.parse(data, word);
      console.log(js);
      if (!js.error) {
        js = recapData(js, word);
        if (!userData) {
          userData = js;
        } else {
          userData.concepts = userData.concepts.concat(js.concepts);
          userData.connections = userData.connections.concat(js.connections);
        }
        render(userData);
      } else {
        alert("NOT FOUND!");
      }
    });
}

var userData;

$(document)
  .ready(function() {
    $('#submit-btn')
      .click(function() {
        // console.log("Click!");
        getData($('#word')
          .val());
      });
    $('#insight-btn')
      .click(function() {
        getData($('#myModal')
          .find('.modal-title')
          .text()
          .split(' ')
          .join('_'), true);
        $('#myModal').modal('hide');
        // console.log($('#myModal')
        //   .find('.modal-title')
        //   .text());
        // getData($('#word').val());
      });
  });

$(document.body)
  .delegate('input:text', 'keypress', function(e) {
    if (e.which === 13) { // if is enter
      e.preventDefault(); // don't submit form
      getData($('#word')
        .val());
    };
  });
