String.prototype.capitalize = function() {
  return this.toLowerCase()
    .replace(/\b\w/g, function(m) {
      return m.toUpperCase();
    });
};

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
          word.capitalize(),
          function(data) {
            // data = JSON.parse(data);
            // console.log(JSON.parse(data));
            var js = JSON.parse(data);
            console.log(js);
            if (!js.error) {
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
