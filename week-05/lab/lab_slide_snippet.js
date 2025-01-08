
var simpsons = svg.selectAll(".simpsons").data(allData);
simpsons.exit().remove();

// Enter --- adding elements to class simpsons
var simpsonsEnter = simpsons.enter().append("circle")
    .attr("class", "simpsons")
    .attr("href", function(d) { return d+".jpg"; });

// Update --- changing nodes for simpsons
simpsons.merge(simpsonsEnter)
    .transition()
    .duration(1000)
    .attr("r", function(d,i) { return i*20; })
    .attr("cx", function(d) { return scalePosX(d); });



