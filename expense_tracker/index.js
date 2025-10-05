class BudgetTracker {
  constructor() {
    this.transactions = this.loadTransactions();
    this.form = document.getElementById("transactionForm");
    this.transactionList = document.getElementById("transactionList");
    this.balanceElement = document.getElementById("balance");

    this.initEventListeners();
    this.renderTransactions();
    this.updateBalance();
  }

  loadTransactions() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  }

  saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }

  initEventListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addTransaction();
    });
  }

  clearForm() {
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
  }

  addTransaction() {
    const description = document.getElementById("description").value.trim();
    const amount = parseFloat(document.getElementById("amount").value.trim());
    const type = document.getElementById("type").value;

    if (!description || isNaN(amount)) {
      alert("Please provide valid details");
      return;
    }

    const transaction = {
      id: Date.now(),
      description,
      amount: type === "expense" ? -amount : amount,
      type,
    };

    this.transactions.push(transaction);
    this.saveTransactions();
    this.renderTransactions();
    this.updateBalance();
    this.clearForm();
  }

  renderTransactions() {
    this.transactionList.innerHTML = "";
    this.transactions
      .slice()
      .sort((a, b) => b.id - a.id)
      .forEach((transactions) => {
        const transactionDiv = document.createElement("div");
        transactionDiv.classList.add("transaction", transactions.type);
        transactionDiv.innerHTML = `
            <span>${transactions.description}</span>
                <span class="amount-container"> ₹ ${Math.abs(
                  transactions.amount
                ).toFixed(2)} <button class="delete-btn" data-id="${
          transactions.id
        }">Delete</button></span>
            `;
        this.transactionList.appendChild(transactionDiv);
      });
    // here data-id is used as a custom class for specificity of delete btn
    // sort method: used to sort the array and modifies the original array; takes a callback function according to which sorting is done ; ensures the sequence is descending

    this.attachDeleteEventListener();
  }

  attachDeleteEventListener() {
    this.transactionList.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        this.deleteTransaction(parseInt(button.dataset.id));
      });
    });
  }
  // dataset is a property of JavaScript object used to access all custom data attributes (attributes prefixed with 'data-') of an HTML element.
  deleteTransaction(id) {
    this.transactions = this.transactions.filter(
      (transactions) => transactions.id !== id
    );

    this.saveTransactions();
    this.renderTransactions();
    this.updateBalance();
  }

  updateBalance() {
    const balance = this.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    this.balanceElement.textContent = `Balance: ₹${balance.toFixed(2)}`;

    this.balanceElement.style.color = balance >= 0 ? 'green' : 'red'
  }
}

const budgetTracker = new BudgetTracker();
