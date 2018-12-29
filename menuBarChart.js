const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);
// asynchronous returns promise and fire call back function
d3.json("menu.json").then(data => {
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.orders)])
    .range([0, 500]);

  // const min = d3.min(data, d => d.orders);
  // const max = d3.max(data, d => d.orders);

  // showing both min and max in extent in array form
  // const extent = d3.extent(data, d => d.orders);

  // console.log(min, max, extent);

  // domain = whole scale, range = actual scale you want
  const x = d3
    .scaleBand()
    .domain(data.map(item => item.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  // console.log(x("veg curry"));
  // console.log(y(400));
  // console.log(y(0));
  // console.log(y(900));

  // join the data to rects
  const rects = svg.selectAll("rect").data(data);

  //Real DOM with attribute
  // Use bandwidth to scale the width properties we set in x above (paddingInner and paddingOuter)
  // Use x(d.name) to spread them equally on the canvas

  rects
    .attr("width", x.bandwidth)
    .attr("height", d => y(d.orders))
    .attr("fill", "orange")
    .attr("x", d => x(d.name));

  //Making virtual DOMs with enter() + append()
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", d => y(d.orders))
    .attr("fill", "orange")
    .attr("x", d => x(d.name));
});
