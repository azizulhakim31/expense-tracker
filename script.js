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

const today = new Date();
const localDate = today.toLocaleDateString("en-CA");
dateInput.value = localDate;
