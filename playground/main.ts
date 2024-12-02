// import * as vis from "vis-timeline";

var container = document.getElementById("visualization");
var items = [];
for (var i = 0; i < 100; i++) {
  items.push({
    x: new Date("2014-06-11").valueOf() + Math.floor(Math.random() * 30000),
    y: 500 + Math.random() * 100,
  })=
}

var dataset = new vis.DataSet(items);
var options = {
  sort: false,
  sampling: false,
  style: "points",
  dataAxis: {
    left: {
      range: {
        min: 300,
        max: 800,
      },
    },
  },
  drawPoints: {
    enabled: true,
    size: 6,
    style: "circle", // square, circle
  },
  defaultGroup: "Scatterplot",
  height: "600px",
};
var graph2d = new vis.Graph2d(container, dataset, options);
