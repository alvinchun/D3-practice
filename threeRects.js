const data = [
  { width: 200, height: 100, fill: "purple" },
  { width: 100, height: 60, fill: "pink" },
  { width: 50, height: 30, fill: "red" }
];

const svg = d3.select("svg");
console.log(svg);

// using .data() method to get the data above by saying data(data) (putting data inside of the data method parentheses)
const rects = svg.selectAll("rect").data(data);

// add attrs to reacts already in the DOM
rects
  .attr("width", (d, i, n) => d.width)
  .attr("height", d => d.height)
  .attr("fill", d => d.fill);

console.log(rects);

// append the enter selection to DOM
rects
  .enter()
  .append("rect")
  .attr("width", (d, i, n) => d.width)
  .attr("height", d => d.height)
  .attr("fill", d => d.fill);
//EnterNode = virtual DOM (node)
