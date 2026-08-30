const transactionForm = document.getElementById("transaction_form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const transactionList = document.getElementById("transaction_list");
const emptyMessage = document.getElementById("empty_message");
const searchInput = document.getElementById("search");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// set today's date
const today = new Date();
const localDate = today.toLocaleDateString("en-CA");
dateInput.value = localDate;

// save transactions
function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// add transaction
transactionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;

    if (!description || amount <= 0 || !date) {
        alert("Please enter valid transaction details.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category,
        date: date
    };

    transactions.push(transaction);
    saveTransactions();
    updateSummary();

    transactionForm.reset();

    // reset date after form reset
    const today = new Date();
    const localDate = today.toLocaleDateString("en-CA");
    dateInput.value = localDate;
});

// delete transaction
function deleteTransaction(id) {
    transactions = transactions.filter(
        transaction => transaction.id !== id
    );
    saveTransactions();
    updateSummary();
}

// format money
function formatMoney(amount) {
    return "$" + amount.toFixed(2);
}

// format date
function formatDate(date) {
    const dateObject = new Date(date + "T00:00:00");

    return dateObject.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

// update summery
function updateSummary() {
    const income = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => {
            return total + transaction.amount;
        }, 0);
    const expense = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => {
            return total + transaction.amount;
        }, 0);

    const balance = income - expense;

    balanceElement.textContent = formatMoney(balance);
    incomeElement.textContent = formatMoney(income);
    expenseElement.textContent = formatMoney(expense);
}

// render transacstions
function renderTransactions(filteredTransactions = transactions) {

    transactionList.innerHTML = "";

    if (filteredTransactions.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    // newest transactions first
    const sortedTransactions = [...filteredTransactions].sort(
        (a, b) => b.id - a.id
    );

    sortedTransactions.forEach(transaction => {
        const transactionElement = document.createElement("div");

        transactionElement.className = "transaction";

        const icon = transaction.type === "income" ? "↑" : "↓";
        const size = transaction.type === "income" ? "+" : "-";

    })
}

updateSummary();