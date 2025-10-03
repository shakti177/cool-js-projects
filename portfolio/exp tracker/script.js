const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const inc = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  const exp = (
    amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  income.innerText = `$${inc}`;
  expense.innerText = `$${exp}`;
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount > 0 ? "+" : "-";
  const li = document.createElement("li");

  li.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
  `;
  list.appendChild(li);
}

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  addTransactionDOM(transaction);
  updateValues();
  updateChart();

  text.value = "";
  amount.value = "";
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
  updateChart();
}

form.addEventListener("submit", addTransaction);

init();

let myChart;
function updateChart() {
  const inc = transactions.filter(t => t.amount > 0).reduce((a, t) => a + t.amount, 0);
  const exp = transactions.filter(t => t.amount < 0).reduce((a, t) => a + t.amount, 0) * -1;

  if (myChart) myChart.destroy();

  myChart = new Chart(document.getElementById("myChart"), {
    type: "doughnut",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [inc, exp],
          backgroundColor: ["#2ecc71", "#e74c3c"],
        },
      ],
    },
  });
}