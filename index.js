let data;
let user = {};

function addEventListeners() {
  console.log("adding events");
  document.getElementsByName("working").forEach((element) => {
    element.addEventListener("change", function (event) {
      user.working = event.currentTarget.id;
      updateRemoteChart();
    });
  });
}

function initData(newData) {
  data = newData.map((row) => {
    const physicallyInBerlin =
      row["0. Are you currently employed in Berlin or by a Berlin-based organization?"] ==
      "Yes, I'm physically working in Berlin.";
    const workingRemotelyForBerlin =
      row["0. Are you currently employed in Berlin or by a Berlin-based organization?"] ===
      "Yes, I'm working remotely for a Berlin-based organization.";
    return { ...row, physicallyInBerlin, workingRemotelyForBerlin };
  });
  addEventListeners();
  renderRemoteChart();
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
