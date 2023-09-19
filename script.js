// Set up the SVG canvas
const svgWidth = 960;
const svgHeight = 600;

const svg = d3.select("#map").attr("width", svgWidth).attr("height", svgHeight);

// Define a projection for the map
const projection = d3
  .geoAlbersUsa()
  .translate([svgWidth / 2, svgHeight / 2])
  .scale(1000);

// Create a path generator
const path = d3.geoPath().projection(projection);

// Load the GeoJSON data from your states-us.json file
d3.json("us-states.json").then(function (data) {
  // Create a GeoJSON feature collection
  const features = data.features;
  var colorScale = d3
    .scaleLinear()
    .domain([-20, -13, -7, 0, 7, 13, 20])
    .range([
      "#DE3163",
      "#FF4979",
      "#FF5C88",
      "white",
      "#FF9046",
      "#FF8432",
      "#FF6600",
    ]);

  var legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", "translate(600, 25)");

  var legendWidth = 300;
  var legendHeight = 20;

  var legendScale = d3.scaleLinear().domain([-20, 20]).range([0, legendWidth]);

  var legendAxis = d3
    .axisBottom(legendScale)
    .tickValues([-20, 0, 20])
    .tickFormat(d3.format(" "))
    .tickSizeOuter(0);

  legend
    .append("g")
    .attr("transform", "translate(0, " + legendHeight + ")")
    .call(legendAxis)
    .select(".domain")
    .remove();

  legend
    .append("rect")
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#legend-gradient)");

  legend.selectAll("line").style("stroke", "white");

  legend.selectAll("text").style("fill", "white");

  var legendGradient = legend
    .append("defs")
    .append("linearGradient")
    .attr("id", "legend-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

  legendGradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#DE3163");

  legendGradient
    .append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "white");

  legendGradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#FF6600");

  // Add the states as path elements
  svg
    .selectAll("path")
    .data(features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("stroke", "black") // Border color
    .style("stroke-width", 1)
    .style("fill", function (d) {
      var movieNumber = d.properties.number;
      return colorScale(movieNumber);
    })
    .on("mouseover", function (d) {
      var currentColor = d3.select(this).style("fill");
      d3.select(this)
        .style("fill", "white")
        .style("opacity", "0.7")
        .attr("data-current-color", currentColor);
      d3.select("#state-name")
        .text(d.properties.name)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px")
        .style("display", "block");

      d3.select(this).attr("cursor", "pointer");
      d3.select(this)
        .on("click", function (d) {
          onClick(d);
        })
        .on("mouseleave", function (d) {
          var currentColor = d3.select(this).attr("data-current-color");
          d3.select(this).style("fill", currentColor).style("opacity", "1");
          d3.select("#state-name").style("display", "none");
        });
    });
    Chart.defaults.color = '#FFF';
  svg
    .selectAll("text")
    .data(features)
    .enter()
    .append("text")
    .attr("x", function (d) {
      // Calculate the centroid of the state's path for the x-coordinate
      var centroid = path.centroid(d);
      return centroid[0];
    })
    .attr("y", function (d) {
      // Calculate the centroid of the state's path for the y-coordinate
      var centroid = path.centroid(d);
      return centroid[1];
    })
    .text(function (d) {
      // Display the state name
      return d.properties.number;
    })
    .attr("class", "number")
    .attr("text-anchor", "middle")
    .style("fill", "black");

  var barChart1, barChart2, barChart3, barChart4, barChart5, barChart6, lineChart7;

  var barData1 = {
    labels: ["Barbie", "Oppenheimer"],
    datasets: [
        
    ],
  };

  var barData2 = {
    labels: ["Barbie", "Oppenheimer"],
    datasets: [],
  };

  var barData3 = {
    labels: ["Barbie", "Oppenheimer"],
    datasets: [],
  };

  var barData4 = {
    labels: ["18-29", "30-44", "45-64", "65+"],
    datasets: [],
  };

  var barData5 = {
    labels: ["Female", "Male"],
    datasets: [],
  };

  var barData6 = {
    labels: [
      "Beauty",
      "Fashion and design",
      "Horoscopes, astrology",
      "Politics and social issues",
      "National news",
      "Science",
    ],
    datasets: [],
  };

  var lineData7 = {
    labels: ["Jul 21-27", "Jul 28-Aug 3", "Aug 4-10", "Aug 11-17", "Aug 18-24", "Aug 25-31", "Sep 1-7",],
    datasets: [],
  }

  var ctx1 = document.getElementById("budget").getContext("2d");
  var ctx2 = document.getElementById("openingWeekend").getContext("2d");
  var ctx3 = document.getElementById("total").getContext("2d");
  var ctx4 = document.getElementById("age").getContext("2d");
  var ctx5 = document.getElementById("gender").getContext("2d");
  var ctx6 = document.getElementById("lifestyleInterests").getContext("2d");
  var ctx7 = document.getElementById("profit").getContext("2d");

  var barOptions1 = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "production budget",
        },
      },
    },
  };

  var barOptions2 = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "opening weekend",
        },
      },
    },
  };

  var barOptions3 = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "total",
        },
      },
    },
  };

  var barOptions4 = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Showing the demographic makeup and interests of each group (%)",
        },
      },

      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Age",
        },
      },
    },
  };

  var barOptions5 = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Showing the demographic makeup and interests of each group (%)",
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Gender",
        },
      },
    },
  };

  var barOptions6 = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Showing the demographic makeup and interests of each group (%)",
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Lifestyle Interests",
        },
      },
    },
  };

  var lineOptions7 = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Profit",
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Period",
        },
      },
    },
  };

  barChart1 = new Chart(ctx1, {
    type: "bar",
    data: barData1,
    options: barOptions1,
  });

  barChart2 = new Chart(ctx2, {
    type: "bar",
    data: barData2,
    options: barOptions2,
  });

  barChart3 = new Chart(ctx3, {
    type: "bar",
    data: barData3,
    options: barOptions3,
  });

  barChart4 = new Chart(ctx4, {
    type: "bar",
    data: barData4,
    options: barOptions4,
  });

  barChart5 = new Chart(ctx5, {
    type: "bar",
    data: barData5,
    options: barOptions5,
  });

  barChart6 = new Chart(ctx6, {
    type: "bar",
    data: barData6,
    options: barOptions6,
  });

  lineChart7 = new Chart(ctx7, {
    type: "line",
    data: lineData7,
    options: lineOptions7,
  });

  barData1.datasets = [];
  barData2.datasets = [];
  barData3.datasets = [];
  barData4.datasets = [];
  barData5.datasets = [];
  barData6.datasets = [];
  lineData7.datasets = [];

  const data1 = [
    {
      name: "Barbie",
      productionBudget: 160000000,
    },
    {
      name: "Oppenheimer",
      productionBudget: 100000000,
    },
  ];

  const data2 = [
    {
      name: "Barbie",
      openingWeekend: 155000000,
    },
    {
      name: "Oppenheimer",
      openingWeekend: 80000000,
    },
  ];

  const data3 = [
    {
      name: "Barbie",
      total: 1380000000,
    },
    {
      name: "Oppenheimer",
      total: 900000000,
    },
  ];

  const data4B = [
    {
      name: "18-29",
      age: 36,
    },
    {
      name: "30-44",
      age: 39,
    },
    {
      name: "45-64",
      age: 20,
    },
    {
      name: "65+",
      age: 4,
    },
  ];

  const data4O = [
    {
      name: "18-29",
      age: 27,
    },
    {
      name: "30-44",
      age: 34,
    },
    {
      name: "45-64",
      age: 26,
    },
    {
      name: "65+",
      age: 13,
    },
  ];

  const data5B = [
    {
      name: "Female",
      gender: 54,
    },
    {
      name: "Male",
      gender: 46,
    },
  ];

  const data5O = [
    {
      name: "Female",
      gender: 39,
    },
    {
      name: "Male",
      gender: 61,
    },
  ];

  const data6B = [
    {
      name: "Beauty",
      lifestyle: 41,
    },
    {
      name: "Fashion and design",
      lifestyle: 37,
    },
    {
      name: "Horoscopes and astrology",
      lifestyle: 22,
    },
    {
      name: "Politics and social issues",
      lifestyle: 38,
    },
    {
      name: "National news",
      lifestyle: 35,
    },
    {
      name: "Science",
      lifestyle: 37,
    },
  ];

  const data6O = [
    {
      name: "Beauty",
      lifestyle: 15,
    },
    {
      name: "Fashion and design",
      lifestyle: 20,
    },
    {
      name: "Horoscopes and astrology",
      lifestyle: 14,
    },
    {
      name: "Politics and social issues",
      lifestyle: 47,
    },
    {
      name: "National news",
      lifestyle: 44,
    },
    {
      name: "Science",
      lifestyle: 51,
    },
  ];

  const data7B = [
    {
        name: "Jul 21-27",
        profit: "258402851",
    },
    {
        name: "Jul 28-Aug 3",
        profit: "147978562",
    },
    {
        name: "Aug 4-10",
        profit: "86227481",
    },
    {
        name: "Aug 11-17",
        profit: "53173971",
    },
    {
        name: "Aug 18-24",
        profit: "31918377",
    },
    {
        name: "Aug 25-31",
        profit: "21183012",
    },
    {
        name: "Sep 1-7",
        profit: "15692603",
    },
  ];

  const data7O = [
    {
        name: "Jul 21-27",
        profit: "127860430",
    },
    {
        name: "Jul 28-Aug 3",
        profit: "72008190",
    },
    {
        name: "Aug 4-10",
        profit: "45600855",
    },
    {
        name: "Aug 11-17",
        profit: "29162260",
    },
    {
        name: "Aug 18-24",
        profit: "16392525",
    },
    {
        name: "Aug 25-31",
        profit: "12006740",
    },
    {
        name: "Sep 1-7",
        profit: "9105955",
    },
  ];

  const barbieProductionBudget = data1.find(
    (item) => item.name === "Barbie"
  ).productionBudget;
  const oppenheimerProductionBudget = data1.find(
    (item) => item.name === "Oppenheimer"
  ).productionBudget;

  const barbieOpeningWeekend = data2.find(
    (item) => item.name === "Barbie"
  ).openingWeekend;
  const oppenheimerOpeningWeekend = data2.find(
    (item) => item.name === "Oppenheimer"
  ).openingWeekend;

  const barbieTotal = data3.find((item) => item.name === "Barbie").total;
  const oppenheimerTotal = data3.find(
    (item) => item.name === "Oppenheimer"
  ).total;

  const barbieAge1 = data4B.find((item) => item.name === "18-29").age;
  const barbieAge2 = data4B.find((item) => item.name === "30-44").age;
  const barbieAge3 = data4B.find((item) => item.name === "45-64").age;
  const barbieAge4 = data4B.find((item) => item.name === "65+").age;

  const oppenheimerAge1 = data4O.find((item) => item.name === "18-29").age;
  const oppenheimerAge2 = data4O.find((item) => item.name === "30-44").age;
  const oppenheimerAge3 = data4O.find((item) => item.name === "45-64").age;
  const oppenheimerAge4 = data4O.find((item) => item.name === "65+").age;

  const barbieGender1 = data5B.find((item) => item.name === "Female").gender;
  const barbieGender2 = data5B.find((item) => item.name === "Male").gender;

  const oppeheimerGender1 = data5O.find(
    (item) => item.name === "Female"
  ).gender;
  const oppeheimerGender2 = data5O.find(
    (item) => item.name === "Male").gender;

  const barbieLifestyle1 = data6B.find(
    (item) => item.name === "Beauty"
  ).lifestyle;
  const barbieLifestyle2 = data6B.find(
    (item) => item.name === "Fashion and design"
  ).lifestyle;
  const barbieLifestyle3 = data6B.find(
    (item) => item.name === "Horoscopes and astrology"
  ).lifestyle;
  const barbieLifestyle4 = data6B.find(
    (item) => item.name === "Politics and social issues"
  ).lifestyle;
  const barbieLifestyle5 = data6B.find(
    (item) => item.name === "National news"
  ).lifestyle;
  const barbieLifestyle6 = data6B.find(
    (item) => item.name === "Science"
  ).lifestyle;

  const oppenheimerLifestyle1 = data6O.find(
    (item) => item.name === "Beauty"
  ).lifestyle;
  const oppenheimerLifestyle2 = data6O.find(
    (item) => item.name === "Fashion and design"
  ).lifestyle;
  const oppenheimerLifestyle3 = data6O.find(
    (item) => item.name === "Horoscopes and astrology"
  ).lifestyle;
  const oppenheimerLifestyle4 = data6O.find(
    (item) => item.name === "Politics and social issues"
  ).lifestyle;
  const oppenheimerLifestyle5 = data6O.find(
    (item) => item.name === "National news"
  ).lifestyle;
  const oppenheimerLifestyle6 = data6O.find(
    (item) => item.name === "Science"
  ).lifestyle;


  const barbieProfit1 = data7B.find((item) => item.name === "Jul 21-27").profit;
  const barbieProfit2 = data7B.find((item) => item.name === "Jul 28-Aug 3").profit;
  const barbieProfit3 = data7B.find((item) => item.name === "Aug 4-10").profit;
  const barbieProfit4 = data7B.find((item) => item.name === "Aug 11-17").profit;
  const barbieProfit5 = data7B.find((item) => item.name === "Aug 18-24").profit;
  const barbieProfit6 = data7B.find((item) => item.name === "Aug 25-31").profit;
  const barbieProfit7 = data7B.find((item) => item.name === "Sep 1-7").profit;

  const oppenheimerProfit1 = data7O.find((item) => item.name === "Jul 21-27").profit;
  const oppenheimerProfit2 = data7O.find((item) => item.name === "Jul 28-Aug 3").profit;
  const oppenheimerProfit3 = data7O.find((item) => item.name === "Aug 4-10").profit;
  const oppenheimerProfit4 = data7O.find((item) => item.name === "Aug 11-17").profit;
  const oppenheimerProfit5 = data7O.find((item) => item.name === "Aug 18-24").profit;
  const oppenheimerProfit6 = data7O.find((item) => item.name === "Aug 25-31").profit;
  const oppenheimerProfit7 = data7O.find((item) => item.name === "Sep 1-7").profit;


  var productionBudget = [barbieProductionBudget, oppenheimerProductionBudget];

  var openingWeekend = [barbieOpeningWeekend, oppenheimerOpeningWeekend];

  var total = [barbieTotal, oppenheimerTotal];

  var ageB = [barbieAge1, barbieAge2, barbieAge3, barbieAge4];

  var ageO = [
    oppenheimerAge1,
    oppenheimerAge2,
    oppenheimerAge3,
    oppenheimerAge4,
  ];

  var genderB = [barbieGender1, barbieGender2];

  var genderO = [oppeheimerGender1, oppeheimerGender2];

  var lifestyleInterestsB = [
    barbieLifestyle1,
    barbieLifestyle2,
    barbieLifestyle3,
    barbieLifestyle4,
    barbieLifestyle5,
    barbieLifestyle6,
  ];

  var lifestyleInterestsO = [
    oppenheimerLifestyle1,
    oppenheimerLifestyle2,
    oppenheimerLifestyle3,
    oppenheimerLifestyle4,
    oppenheimerLifestyle5,
    oppenheimerLifestyle6,
  ];

  var profitB = [barbieProfit1, barbieProfit2, barbieProfit3, barbieProfit4, barbieProfit5, barbieProfit6, barbieProfit7];

var profitO = [oppenheimerProfit1, oppenheimerProfit2, oppenheimerProfit3, oppenheimerProfit4, oppenheimerProfit5, oppenheimerProfit6, oppenheimerProfit7];

  var dataset1 = {
    backgroundColor: ["#f937a9", "#de4f13"],
    data: productionBudget,
    borderColor: "black",
    fill: true,
  };

  var dataset2 = {
    backgroundColor: ["#f937a9", "#de4f13"],
    data: openingWeekend,
    borderColor: "black",
    fill: true,
  };

  var dataset3 = {
    backgroundColor: ["#f937a9", "#de4f13"],
    data: total,
    borderColor: "black",
    fill: true,
  };

  var dataset4B = {
    label: "Barbie",
    backgroundColor: ["#f937a9"],
    data: ageB,
    borderColor: "black",
    fill: true,
  };

  var dataset4O = {
    label: "Oppenheimer",
    backgroundColor: ["#de4f13"],
    data: ageO,
    borderColor: "black",
    fill: true,
  };

  var dataset5B = {
    label: "Barbie",
    backgroundColor: ["#f937a9"],
    data: genderB,
    borderColor: "black",
    fill: true,
  };

  var dataset5O = {
    label: "Oppenheimer",
    backgroundColor: ["#de4f13"],
    data: genderO,
    borderColor: "black",
    fill: true,
  };

  var dataset6B = {
    label: "Barbie",
    backgroundColor: ["#f937a9"],
    data: lifestyleInterestsB,
    borderColor: "black",
    fill: true,
  };

  var dataset6O = {
    label: "Oppenheimer",
    backgroundColor: ["#de4f13"],
    data: lifestyleInterestsO,
    borderColor: "black",
    fill: true,
  };

  var dataset7B = {
    label: "Barbie",
    backgroundColor: ["#f937a9"],
    data: profitB,
    borderColor: "#f937a9",
    fill: false,
  };

  var dataset7O = {
    label: "Oppenheimer",
    backgroundColor: ["#de4f13"],
    data: profitO,
    borderColor: "#de4f13",
    fill: false,
  };

  barData1.datasets.push(dataset1);
  barChart1.update();
  barData2.datasets.push(dataset2);
  barChart2.update();
  barData3.datasets.push(dataset3);
  barChart3.update();
  barData4.datasets.push(dataset4B, dataset4O);
  barChart4.update();
  barData5.datasets.push(dataset5B, dataset5O);
  barChart5.update();
  barData6.datasets.push(dataset6B, dataset6O);
  barChart6.update();
  lineData7.datasets.push(dataset7B, dataset7O);
  barChart6.update();
});

function onClick(d) {
  console.log(`Name: ${d.properties.name}`);
  var infoDiv = d3.select(".info");
  infoDiv.html(`<p>Name: ${d.properties.name}</p>`);
}

function showMap() {
  d3.select("#map").style("display", "block");
  d3.select("#info").style("display", "none");
  d3.select("#info2").style("display", "none");
  d3.select("#BarbieBox").style("display", "none");
  d3.select("#OppenheimerBox").style("display", "none");
  d3.select("#budget").style("display", "none");
  d3.select("#openingWeekend").style("display", "none");
  d3.select("#total").style("display", "none");
  d3.select("#profit").style("display", "none");
  d3.select("#ChartContainer").style("display", "none");
}

function showInfo() {
  d3.select("#map").style("display", "none");
  d3.select("#info").style("display", "block");
  d3.select("#info2").style("display", "none");
  d3.select("#BarbieBox").style("display", "block");
  d3.select("#OppenheimerBox").style("display", "block");
  d3.select("#budget").style("display", "none");
  d3.select("#openingWeekend").style("display", "none");
  d3.select("#total").style("display", "none");
  d3.select("#profit").style("display", "none");
  d3.select("#ChartContainer").style("display", "none");
}

function showFans() {
  d3.select("#map").style("display", "none");
  d3.select("#info").style("display", "none");
  d3.select("#info2").style("display", "block");
  d3.select("#BarbieBox").style("display", "none");
  d3.select("#OppenheimerBox").style("display", "none");
  d3.select("#budget").style("display", "none");
  d3.select("#openingWeekend").style("display", "none");
  d3.select("#total").style("display", "none");
  d3.select("#age").style("display", "block");
  d3.select("#gender").style("display", "block");
  d3.select("#lifestyleInterests").style("display", "block");
  d3.select("#profit").style("display", "none");
  d3.select("#ChartContainer").style("display", "none");
}

function showProfit() {
    d3.select("#map").style("display", "none");
    d3.select("#info").style("display", "none");
    d3.select("#info2").style("display", "none");
    d3.select("#BarbieBox").style("display", "none");
    d3.select("#OppenheimerBox").style("display", "none");
    d3.select("#budget").style("display", "none");
    d3.select("#openingWeekend").style("display", "none");
    d3.select("#total").style("display", "none");
    d3.select("#age").style("display", "none");
    d3.select("#gender").style("display", "none");
    d3.select("#lifestyleInterests").style("display", "none");
    d3.select("#profit").style("display", "block");
    d3.select("#ChartContainer").style("display", "block");
  }

function showBudget() {
  d3.select("#map").style("display", "none");
  d3.select("#info").style("display", "block");
  d3.select("#info2").style("display", "none");
  d3.select("#BarbieBox").style("display", "block");
  d3.select("#OppenheimerBox").style("display", "block");
  d3.select("#budget").style("display", "block");
  d3.select("#openingWeekend").style("display", "none");
  d3.select("#total").style("display", "none");
  d3.select("#age").style("display", "none");
  d3.select("#gender").style("display", "none");
  d3.select("#lifestyleInterests").style("display", "none");
  d3.select("#profit").style("display", "none");
  d3.select("#ChartContainer").style("display", "block");
}

function showOpeningWeekend() {
  d3.select("#map").style("display", "none");
  d3.select("#info").style("display", "block");
  d3.select("#info2").style("display", "none");
  d3.select("#BarbieBox").style("display", "block");
  d3.select("#OppenheimerBox").style("display", "block");
  d3.select("#budget").style("display", "none");
  d3.select("#openingWeekend").style("display", "block");
  d3.select("#total").style("display", "none");
  d3.select("#age").style("display", "none");
  d3.select("#gender").style("display", "none");
  d3.select("#lifestyleInterests").style("display", "none");
  d3.select("#profit").style("display", "none");
  d3.select("#ChartContainer").style("display", "block");
}

function showTotal() {
  d3.select("#map").style("display", "none");
  d3.select("#info").style("display", "block");
  d3.select("#info2").style("display", "none");
  d3.select("#BarbieBox").style("display", "block");
  d3.select("#OppenheimerBox").style("display", "block");
  d3.select("#budget").style("display", "none");
  d3.select("#openingWeekend").style("display", "none");
  d3.select("#age").style("display", "none");
  d3.select("#gender").style("display", "none");
  d3.select("#lifestyleInterests").style("display", "none");
  d3.select("#profit").style("display", "none");
  d3.select("#total").style("display", "block");

  d3.select("#ChartContainer").style("display", "block");
}

function showAge() {
  d3.select("#map").style("display", "none");
  d3.select("#info").style("display", "none");
  d3.select("#info2").style("display", "block");
  d3.select("#BarbieBox").style("display", "none");
  d3.select("#OppenheimerBox").style("display", "none");
  d3.select("#budget").style("display", "none");
  d3.select("#openingWeekend").style("display", "none");
  d3.select("#total").style("display", "none");
  d3.select("#age").style("display", "block");
  d3.select("#gender").style("display", "none");
  d3.select("#lifestyleInterests").style("display", "none");
  d3.select("#profit").style("display", "none");
  d3.select("#ChartContainer").style("display", "block");
}

function showGender() {
  d3.select("#map").style("display", "none");
  d3.select("#info").style("display", "none");
  d3.select("#info2").style("display", "block");
  d3.select("#BarbieBox").style("display", "none");
  d3.select("#OppenheimerBox").style("display", "none");
  d3.select("#budget").style("display", "none");
  d3.select("#openingWeekend").style("display", "none");
  d3.select("#total").style("display", "none");
  d3.select("#age").style("display", "none");
  d3.select("#gender").style("display", "block");
  d3.select("#lifestyleInterests").style("display", "none");
  d3.select("#profit").style("display", "none");
  d3.select("#ChartContainer").style("display", "block");
}

function showLifestyleInterests() {
  d3.select("#map").style("display", "none");
  d3.select("#info").style("display", "none");
  d3.select("#info2").style("display", "block");
  d3.select("#BarbieBox").style("display", "none");
  d3.select("#OppenheimerBox").style("display", "none");
  d3.select("#budget").style("display", "none");
  d3.select("#openingWeekend").style("display", "none");
  d3.select("#total").style("display", "none");
  d3.select("#age").style("display", "none");
  d3.select("#gender").style("display", "none");
  d3.select("#lifestyleInterests").style("display", "block");
  d3.select("#profit").style("display", "none");
  d3.select("#ChartContainer").style("display", "block");
}

document.getElementById("showMap").addEventListener("click", showMap);
document.getElementById("showInfo").addEventListener("click", showInfo);
document.getElementById("showFans").addEventListener("click", showFans);
document.getElementById("showBudget").addEventListener("click", showBudget);
document
  .getElementById("showOpeningWeekend")
  .addEventListener("click", showOpeningWeekend);
document.getElementById("showTotal").addEventListener("click", showTotal);
document.getElementById("showAge").addEventListener("click", showAge);
document.getElementById("showGender").addEventListener("click", showGender);
document
  .getElementById("showLifestyleInterests")
  .addEventListener("click", showLifestyleInterests);
  document.getElementById("showProfit").addEventListener("click", showProfit);

showMap();
