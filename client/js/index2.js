(function() {
    var diameter = 960,
        format = d3.format(',d'),
        color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select('#graph').append('svg')
        .attr('width', diameter)
        .attr('height', diameter)
        .attr('class', 'bubble');

    d3.json('js/realdata.json', function(error, root) {
        if (error) {
            throw error;
        }

        var node = svg.selectAll('.node')
            .data(bubble.nodes(classes(root))
                .filter(function(d) {
                    return !d.children;
                }))
            .enter().append('g')
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
            .style('text-anchor', 'middle')
            .text(function(d) {
                return d.className.substring(0, d.r / 3);

            });
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

        // recurse(null, root);
        root.children.forEach(function(child) {
            // body...
            if(child.concept.name){
              classes.push({
                  packageName: child.concept.name,
                  className: child.concept.name,
                  value: child.score,
              });
            } else {
            classes.push({
                packageName: child.concept.label,
                className: child.concept.label,
                value: child.score,
            });
          }
        });

        return {
            children: classes
        };
    }

    d3.select(self.frameElement).style('height', diameter + 'px');
})();
