var render = function(json_data) {
  // console.log(json_data);
  var diameter = 450,
    format = d3.format(',d'),
    color = d3.scale.category20c();

  var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

  var svg = d3.select('#graph')
    .append('svg')
    .attr('width', diameter)
    .attr('height', diameter)
    .attr('class', 'bubble');


  var node = svg.selectAll('.node')
    .data(bubble.nodes(classes(json_data))
      .filter(function(d) {
        return !d.children;
      }))
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function(d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });


  node.append('circle')
    .attr('r', function(d) {
      return d.r;
    })
    .style('fill', function(d) {
      return color(d.packageName);
    });

  node.append('text')
    .attr('dy', '.3em')
    .attr("fill", "white")
    .style('text-anchor', 'middle')
    .text(function(d) {
      return d.className.substring(0, d.r / 3);
    });

  // Returns a flattened hierarchy containing all leaf nodes under the root.
  function classes(root) {
    var classes = [];

    // function recurse(concept, node) {
    //     if (node.children) {
    //         node.children.forEach(function(child) {
    //             recurse(node.concept.name, child);
    //         });
    //     } else {
    //         classes.push({
    //             packageName: name,
    //             className: concept.name,
    //             value: node.score * 1000,
    //         });
    //     }
    // }

    // console.log(json_data);
    // recurse(null, root);

    json_data.concepts.forEach(function(child) {
      // body...
      classes.push({
        packageName: child.concept.label,
        className: child.concept.label,
        value: child.score,
      });
    });

    return {
      children: classes
    };
  }

  d3.select(self.frameElement)
    .style('height', diameter + 'px');
};
