let data;
let user = {};

function addEventListeners() {
  document.getElementsByName("working").forEach((element) => {
    element.addEventListener("change", function (event) {
      user.working = event.currentTarget.id;
      updateRemoteChart();
    });
  });
}

function initData(newData) {
  data = newData
    .map((row) => {
      const physicallyInBerlin =
        row["0. Are you currently employed in Berlin or by a Berlin-based organization?"] ==
        "Yes, I'm physically working in Berlin.";
      const workingRemotelyForBerlin =
        row["0. Are you currently employed in Berlin or by a Berlin-based organization?"] ===
        "Yes, I'm working remotely for a Berlin-based organization.";
      const earning = parseInt(
        row["15. Total annual gross salary in EUR (before taxes and deductions)"].replace(/\D/g, "")
      );
      return { ...row, physicallyInBerlin, workingRemotelyForBerlin, earning };
    })
    .filter((row) => row.physicallyInBerlin || row.workingRemotelyForBerlin);
  addEventListeners();
  renderRemoteChart();
  renderEarningsHistogram();
}

fetch("./data.json")
  .then((response) => response.json())
  .then((json) => initData(json));

let remoteChart;

function getRemoteSeries() {
  const inBerlinDescription =
    user.working === "working-berlin"
      ? "You are in the majority group, working in Berlin"
      : "In Berlin";
  const remoteDescription =
    user.working === "working-remotely"
      ? "You are in the minority group, working remotely for a Berlin based company"
      : "Working remotely";
  return [
    {
      name: "Percentage",
      colorByPoint: true,
      data: [
        {
          name: inBerlinDescription,
          sliced: true,
          y: data.filter((row) => row.physicallyInBerlin).length,
        },
        {
          name: remoteDescription,
          sliced: true,
          y: data.filter((row) => row.workingRemotelyForBerlin).length,
        },
      ],
    },
  ];
}

function renderRemoteChart() {
  remoteChart = Highcharts.chart("working-remote-chart", {
    chart: {
      type: "pie",
    },
    title: {
      text: "Berlin-based vs remote",
    },
    plotOptions: {
      pie: {
        startAngle: -30,
      },
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
          },
        ],
      },
    },
    series: getRemoteSeries(),
  });
}

function updateRemoteChart() {
  remoteChart.update({
    series: getRemoteSeries(),
  });
}

function renderEarningsHistogram() {
  const buckets = [
    {
      name: "Less than 10k",
      data: data.filter((row) => row.earning < 10_000).length,
    },
  ];
  let prevBucket = buckets[0];
  for (let n = 10; n < 200; n += 10) {
    buckets.push({
      name: `${n}k to ${n + 10}k`,
      data: data.filter((row) => row.earning >= (n - 10) * 1_000 && row.earning < n * 1_000).length,
    });
  }
  buckets.push({
    name: "More than 200k",
  });
  Highcharts.chart("earning-chart", {
    chart: {
      type: "column",
    },
    title: {
      text: "Distribution of salaries",
    },
    xAxis: {
      categories: buckets.map((bucket) => bucket.name),
      crosshair: true,
      accessibility: {
        description: "Yearly salary",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Amount of respondants",
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        minPointLength: 2,
      },
    },
    series: [
      {
        name: "Respondants",
        data: buckets.map((bucket) => bucket.data),
      },
    ],
  });
}
