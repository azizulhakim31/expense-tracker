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
});