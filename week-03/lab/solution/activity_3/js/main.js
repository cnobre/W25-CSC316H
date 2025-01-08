d3.csv("data/cities.csv", row =>{

  // 3 prepare data
  row.population = +row.population;
  row.x = +row.x;
  row.y = +row.y;
  return row

}).then( data => {
  console.log(data); // [{"Hello": "world"}, …]
  drawChart(data)
});

console.log(`look at that: The browser already interpreted this line, while it's still waiting for the data to load`)


function drawChart(data){

// 4) FILTER ALL CITIES WHICH ARE PART OF THE EUROPEAN UNION
  let filteredData = data.filter(function(d){ return d.eu === "true" });


// 5) GET THE LENGTH OF THE DATASET AND APPEND IT TO THE WEBPAGE
  d3.select("body")
      .append("p")
      .text("Number of cities: " + filteredData.length);


// 6) APPEND SVG CONTAINER & CIRCLES
// 7) USE ANONYMOUS FUNCTIONS TO ACCESS OBJECT VALUES AND TO CREATE DYNAMIC PROPERTIES
  let svg = d3.select("body").append("svg")
      .attr("width", 700)
      .attr("height", 550)
      .attr("class", "d3-chart");


  let circles = svg.selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("r", function(d){
        if(d.population >= 1000000)
          return 8;
        else
          return 4;
      })
      .attr("cx", function(d){ return d.x; })
      .attr("cy", function(d){ return d.y; })
      .on('click', (event, d) =>{
          console.log(event, d, d3.select(this))
      })


// 8) APPEND TEXT LABELS
  let labels = svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "city-label")
      .attr("opacity", function(d){
        if(d.population >= 1000000)
          return 1;
        else
          return 0;
      })
      .text(function(d){ return d.city; })
      .attr("x", function(d){ return d.x; })
      .attr("y", function(d){ return d.y - 15; })
}