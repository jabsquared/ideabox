var render = function(json_data) {
  // console.log(json_data);
  d3.select("svg")
    .remove();
  var diameter = 540,
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

  d3plus.textwrap()
    .container(svg.selectAll('.node'))
    .draw();

  node.append('circle')
    .attr('r', function(d) {
      return d.r;
    })
    .style('fill', function(d) {
      return color(d.packageName);
    })
    .on("mouseover", function(d) {
      d3.select(this)
        .transition()
        .ease("quad")
        .duration("360")
        .attr("r", 100);
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .transition()
        .ease("quad")
        .duration("360")
        .attr("r", function(d) {
          return d.r;
        });
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

    json_data.concepts.forEach(function(child) {
      // body...
      classes.push({
        packageName: child.concept,
        className: child.concept,
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
