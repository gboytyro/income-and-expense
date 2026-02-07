/*
  ui.js
  Manages user inputs, validation, and UI text updates.
*/

window.FreedomUI = (() => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const elements = {
    form: null,
    error: null,
    totalFreedom: null,
  };

  const init = () => {
    elements.form = document.getElementById("controls");
    elements.error = document.getElementById("formError");
    elements.totalFreedom = document.getElementById("totalFreedom");
    return elements;
  };

  const parseNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const validateInputs = (values) => {
    if (!values) return "Please enter valid numeric values.";
    const { startingIncome, startingExpense, incomeGrowthRate, expenseGrowthRate, years } = values;

    if (startingIncome < 0 || startingExpense < 0) {
      return "Starting values must be zero or higher.";
    }

    if (incomeGrowthRate < 0 || expenseGrowthRate < 0) {
      return "Growth rates must be zero or higher.";
    }

    if (!Number.isInteger(years) || years < 1) {
      return "Number of years must be at least 1.";
    }

    return "";
  };

  const getFormValues = () => {
    if (!elements.form) return null;
    const formData = new FormData(elements.form);
    const values = {
      startingIncome: parseNumber(formData.get("startingIncome")),
      startingExpense: parseNumber(formData.get("startingExpense")),
      incomeGrowthRate: parseNumber(formData.get("incomeGrowthRate")),
      expenseGrowthRate: parseNumber(formData.get("expenseGrowthRate")),
      years: parseNumber(formData.get("years")),
    };

    const errorMessage = validateInputs(values);
    if (elements.error) {
      elements.error.textContent = errorMessage;
    }

    return errorMessage ? null : values;
  };

  const updateTotalFreedom = (years, totalFreedom) => {
    if (!elements.totalFreedom) return;
    elements.totalFreedom.textContent = `Total Freedom (Cumulative Surplus) after ${years} years: ${formatCurrency(totalFreedom)}`;
  };

  const formatCurrency = (value) => formatter.format(value);

  return {
    elements,
    init,
    getFormValues,
    updateTotalFreedom,
    formatCurrency,
  };
})();
