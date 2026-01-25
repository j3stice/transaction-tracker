const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const filter = document.getElementById("filter");
const balanceText = document.getElementById("balance");

// Load from storage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Save helper
function save() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add transaction
addBtn.addEventListener("click", () => {
    const desc = descInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categorySelect.value;

    if (!desc || !amount) return;

    transactions.push({
        date: new Date().toLocaleDateString(),
        desc,
        category,
        amount
    });

    descInput.value = "";
    amountInput.value = "";
    save();
    render();
});

// Filter change
filter.addEventListener("change", render);

// Render table
function render() {
    tableBody.innerHTML = "";
    let balance = 0;

    transactions.forEach(t => {
        if (filter.value !== "All" && t.category !== filter.value) return;

        balance += t.amount;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${t.date}</td>
            <td>${t.desc}</td>
            <td>${t.category}</td>
            <td class="${t.amount >= 0 ? 'income' : 'expense'}">
                ${t.amount.toFixed(2)}
            </td>
        `;
        tableBody.appendChild(row);
    });

    balanceText.textContent = `Current Balance: $${balance.toFixed(2)}`;
}

render();