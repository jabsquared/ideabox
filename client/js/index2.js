var render = function(data) {

  // instantiate d3plus
  var visualization = d3plus.viz()
    .container("#viz") // container DIV to hold the visualization
    .data(data.concepts) // data to use with the visualization
    .type("bubbles") // visualization type
    // .type("network")
    .id(["group", "concept"]) // nesting keys
    .depth(1) // 0-based depth
    // .edges(data.connections)
    .size("score") // key name to size bubbles
    .color("concept") // color by each group
    .draw() // finally, draw the visualization!
    .mouse({
      "click": function(d, viz) {
        // console.log(d);
        // getData(d.concept, true);

        $.get("https://ideabox.mybluemix.net/i/" +
          d.concept.split(' ')
          .join('_'),
          function(data) {
            // data = JSON.parse(data);
            // console.log(JSON.parse(data));
            var js = JSON.parse(data);
            console.log(js);
            if (!js.error) {
              // alert(js.abstract);
              $('#myModal').find('.modal-title').text(d.concept);
              $('#myModal').find('p').text(js.abstract)
              $('#myModal').modal('show');
            } else {
              alert("NOT FOUND!");
            }
          }
        );
      },
    })
};
