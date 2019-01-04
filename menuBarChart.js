const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);
// asynchronous returns promise and fire call back function

const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

// 'g' is group
const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0,${graphHeight})`);
const yAxisGroup = graph.append("g");

d3.json("menu.json").then(data => {
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.orders)])
    .range([graphHeight, 0]);

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
  const rects = graph.selectAll("rect").data(data);

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
    .attr("height", d => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.orders));

  // create and call the axes
  const xAxis = d3.axisBottom(x);
  const yAxis = d3
    .axisLeft(y)
    .ticks(3)
    .tickFormat(d => d + " orders");

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  //text anchor = default (locating the text middle of the text anchor point)
  //but we can try to rotate with middle point with end of the text
  xAxisGroup
    .selectAll("text")
    .attr("transform", "rotate(-10)")
    .attr("text-anchor", "end")
    .attr("fill", "blue");
});
