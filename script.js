// Grab DOM elements
const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");
const balanceText = document.getElementById("balance");

// Load saved transactions or start empty
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Handle form submission
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get user input values
    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    // Create transaction object
    const transaction = { description, amount, category };

    // Store transaction
    transactions.push(transaction);
    saveAndRender();

    // Reset form
    form.reset();
});

// Save to localStorage and update UI
function saveAndRender() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
    updateBalance();
}

// Render transactions in table
function renderTransactions() {
    list.innerHTML = "";

    transactions.forEach(t => {
        const row = document.createElement("tr");

        // Decide if transaction is income or expense
        const isIncome = t.category === "Income";

        row.innerHTML = `
            <td>${t.description}</td>
            <td>
                <span class="badge ${t.category.toLowerCase()} ${isIncome ? "income-badge" : ""}">
                    ${t.category}
                </span>
            </td>
            <td class="${isIncome ? "income" : "expense"}">
                ${isIncome ? "+" : "-"}$${Math.abs(t.amount)}
            </td>
        `;

        list.appendChild(row);
    });
}

// Calculate and update balance
function updateBalance() {
    const total = transactions.reduce((sum, t) => {
        return t.category === "Income" ? sum + t.amount : sum - t.amount;
    }, 0);

    balanceText.textContent = `Balance: $${total}`;

    // Small animation for visual feedback
    balanceText.classList.add("balance-update");
    setTimeout(() => balanceText.classList.remove("balance-update"), 200);
}

// Initial render on page load
renderTransactions();
updateBalance();
