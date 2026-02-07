/*
  main.js
  Coordinates data calculations with UI updates and chart rendering.
*/

document.addEventListener("DOMContentLoaded", () => {
  const { elements, init, getFormValues, updateTotalFreedom } = window.FreedomUI;
  init();
  const canvas = document.getElementById("freedomChart");
  if (!canvas || !elements.form) {
    return;
  }
  const ctx = canvas.getContext("2d");

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

    for (let year = 1; year <= years; year += 1) {
      const incomeValue = startingIncome * Math.pow(1 + incomeRate, year - 1);
      const expenseValue = startingExpense * Math.pow(1 + expenseRate, year - 1);

      income.push(Number(incomeValue.toFixed(2)));
      expenses.push(Number(expenseValue.toFixed(2)));
      labels.push(`Year ${year}`);
      totalFreedom += incomeValue - expenseValue;
    }

    return {
      labels,
      income,
      expenses,
      totalFreedom,
    };
  };

  let hasRendered = false;

  const render = () => {
    const values = getFormValues();
    if (!values) return;

    const { labels, income, expenses, totalFreedom } = calculateSeries(values);

    if (!hasRendered) {
      window.FreedomChart.renderChart(ctx, labels, income, expenses);
      hasRendered = true;
    } else {
      window.FreedomChart.updateChart(labels, income, expenses);
    }

    updateTotalFreedom(values.years, totalFreedom);
  };

  elements.form.addEventListener("input", render);
  render();
});
