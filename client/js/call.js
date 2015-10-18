String.prototype.capitalize = function() {
  return this.toLowerCase().replace(/\b\w/g, function(m) {
    return m.toUpperCase();
  });
};

$(document).ready(function() {
  var word;
  $('#submit-btn').click(function() {
    // console.log("Click!");
    word = $('#word').val();

    $.get("https://ideabox.mybluemix.net/p/" +
        word.capitalize(), function(data) {
        // console.log(data);
        data = JSON.parse(data);
        render(data);
    });
  });
});
