const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const demoTransactions = [
//   { id: 1, text: "Sell", amount: 20 },
//   { id: 2, text: "Book", amount: -50 },
//   { id: 3, text: "Apple", amount: 40 },
// ];

// let transactions = demoTransactions;

// creat local storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

  
// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    //console.log(transaction)

    transactions.push(transaction);
    addTransactionDOM(transaction);

    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transaction to Dom list
function addTransactionDOM(transaction) {
  //Get Sing
  const sing = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text} <span>${sing}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick=
  "removeTransaction(${transaction.id})">x</button>`;

  list.appendChild(item);
}

// Update the balance, income and expense

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  //console.log(amounts)

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //console.log(total)

  //icome
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  //console.log(income)

  //expense
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  //console.log(expense)

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove Transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

//update local storage transactions
function updateLocalStorage(){
  localStorage.setItem('transactions', JSON.stringify(transactions))
}
//Init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
