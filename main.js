/*
  main.js
  Coordinates data calculations with UI updates and chart rendering.
*/

document.addEventListener("DOMContentLoaded", () => {
  const { elements, getFormValues, updateTotalFreedom } = window.FreedomUI;
  const ctx = document.getElementById("freedomChart").getContext("2d");

  const calculateSeries = ({
    startingIncome,
    startingExpense,
    incomeGrowthRate,
    expenseGrowthRate,
    years,
  }) => {
    const income = [];
    const expenses = [];
    const labels = [];
    const incomeRate = incomeGrowthRate / 100;
    const expenseRate = expenseGrowthRate / 100;

    let totalFreedom = 0;

    for (let year = 0; year <= years; year += 1) {
      const incomeValue = startingIncome * Math.pow(1 + incomeRate, year);
      const expenseValue = startingExpense * Math.pow(1 + expenseRate, year);

      income.push(Number(incomeValue.toFixed(2)));
      expenses.push(Number(expenseValue.toFixed(2)));
      labels.push(`Year ${year}`);

      if (year > 0) {
        totalFreedom += incomeValue - expenseValue;
      }
    }

    return {
      labels,
      income,
      expenses,
      totalFreedom,
    };
  };

  const render = () => {
    const values = getFormValues();
    if (!values) return;

    const { labels, income, expenses, totalFreedom } = calculateSeries(values);

    if (!window.FreedomChartInstance) {
      window.FreedomChart.renderChart(ctx, labels, income, expenses);
      window.FreedomChartInstance = true;
    } else {
      window.FreedomChart.updateChart(labels, income, expenses);
    }

    updateTotalFreedom(values.years, totalFreedom);
  };

  elements.form.addEventListener("input", render);
  render();
});
