/*
  chart.js
  Handles Chart.js configuration and rendering for the Freedom Gap visualization.
*/

window.FreedomChart = (() => {
  let chartInstance = null;

  const buildDatasets = (income, expenses) => [
    {
      label: "Income",
      data: income,
      borderColor: "#16a34a",
      backgroundColor: "rgba(22, 163, 74, 0.12)",
      tension: 0.35,
      borderWidth: 3,
      pointRadius: 0,
      fill: {
        target: 1,
        above: "rgba(56, 189, 248, 0.22)",
        below: "rgba(239, 68, 68, 0.15)",
      },
    },
    {
      label: "Expenses",
      data: expenses,
      borderColor: "#ef4444",
      backgroundColor: "rgba(239, 68, 68, 0.12)",
      tension: 0.35,
      borderWidth: 3,
      pointRadius: 0,
      fill: false,
    },
  ];

  const buildConfig = (labels, income, expenses) => ({
    type: "line",
    data: {
      labels,
      datasets: buildDatasets(income, expenses),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.parsed.y ?? 0;
              return `${context.dataset.label}: ${window.FreedomUI.formatCurrency(value)}`;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Years",
          },
          ticks: {
            maxRotation: 0,
          },
        },
        y: {
          title: {
            display: true,
            text: "Amount (USD)",
          },
          ticks: {
            callback: (value) => window.FreedomUI.formatCurrency(value),
          },
        },
      },
    },
  });

  const renderChart = (ctx, labels, income, expenses) => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, buildConfig(labels, income, expenses));
  };

  const updateChart = (labels, income, expenses) => {
    if (!chartInstance) return;

    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = income;
    chartInstance.data.datasets[1].data = expenses;
    chartInstance.update();
  };

  return {
    renderChart,
    updateChart,
  };
})();
