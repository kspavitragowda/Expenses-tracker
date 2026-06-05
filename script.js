let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function addTransaction() {

    const description =
        document.getElementById("description").value.trim();

    const amount =
        parseFloat(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);

    saveData();
    renderTransactions();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function deleteTransaction(id) {

    transactions =
        transactions.filter(item => item.id !== id);

    saveData();
    renderTransactions();
}

function renderTransactions() {

    const list =
        document.getElementById("transactionList");

    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(item => {

        if(item.type === "income"){
            income += item.amount;
        } else {
            expense += item.amount;
        }

        const li = document.createElement("li");

        li.className =
            `transaction ${item.type}-item`;

        li.innerHTML = `
            <div class="transaction-info">
                <strong>${item.description}</strong>
                <small>${item.type.toUpperCase()}</small>
            </div>

            <div>
                <span class="amount">
                    ₹${item.amount.toFixed(2)}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${item.id})">
                    Delete
                </button>
            </div>
        `;

        list.appendChild(li);
    });

    if(transactions.length === 0){
        list.innerHTML =
        '<div class="empty">No transactions added yet.</div>';
    }

    const balance = income - expense;

    document.getElementById("incomeTotal")
        .textContent = income.toFixed(2);

    document.getElementById("expenseTotal")
        .textContent = expense.toFixed(2);

    document.getElementById("balance")
        .textContent = balance.toFixed(2);
}

renderTransactions();
