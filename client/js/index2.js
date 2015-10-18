var render = function(json_data) {

  // instantiate d3plus
  var visualization = d3plus.viz()
    .container("#viz") // container DIV to hold the visualization
    .data(json_data.concepts) // data to use with the visualization
    .type("bubbles") // visualization type
    .id(["group", "concept"]) // nesting keys
    .depth(1) // 0-based depth
    // .background('#FF4C4C')
    .size("score") // key name to size bubbles
    .color("concept") // color by each group
    .draw() // finally, draw the visualization!
    .mouse({
      "click": function(d, viz) {
        console.log(d);
        $.get("https://ideabox.mybluemix.net/p/" +
          d.concept.split(' ')
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
      }
    })
};
