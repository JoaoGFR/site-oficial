let legend;
let chat;
let series;
let expenses = [];
let totalExpenses = 0;
let salary = 0;

alimentacaoTotal = 0;
moradiaTotal = 0; 
transporteTotal = 0;
lazerTotal = 0;
saudeTotal = 0;
outrosTotal = 0;
despesasTotal = 0;
cartaoTotal = 0;



function init() {
    // Carrega dados salvos no localStorage, se houver
    loadSavedData();

    // Atualiza o gráfico
    atualizarGrafico();

    // Atualiza a tabela de despesas
    updateExpenseTable();
}
window.addEventListener("load", function (event) {
    init();
  });


  function saveData() {
    const dataToSave = {
        expenses,
        totalExpenses,
        salary,
        alimentacaoTotal,
        moradiaTotal,
        transporteTotal,
        lazerTotal,
        saudeTotal,
        cartaoTotal,
        despesasTotal,
        outrosTotal
        
    };

    // Salva os dados no localStorage
    localStorage.setItem('expensesData', JSON.stringify(dataToSave));
}

function loadSavedData() {
    // Tenta obter os dados do localStorage
    const savedData = JSON.parse(localStorage.getItem('expensesData'));

    if (savedData) {
        expenses = savedData.expenses || [];
        totalExpenses = savedData.totalExpenses || 0;
        salary = savedData.salary || 0;

        // Atualiza os totais por categoria
        alimentacaoTotal = savedData.alimentacaoTotal || 0;
        moradiaTotal = savedData.moradiaTotal || 0;
        transporteTotal = savedData.transporteTotal || 0;
        lazerTotal = savedData.lazerTotal || 0;
        outrosTotal = savedData.outrosTotal || 0;
        saudeTotal = savedData.saudeTotal || 0;
        cartaoTotal = savedData.cartaoTotal || 0;
        despesasTotal = savedData.desepesaTotal || 0;

        // Atualiza o saldo e a tabela
        calculateBalance();
        updateExpenseTable();  // Adiciona esta linha para atualizar a tabela
    }
}


function calculateBalance() {
    salary = parseFloat(document.getElementById("salary").value) || 0;
    const balance = salary - totalExpenses;
    document.getElementById("total-expenses").textContent = totalExpenses;
    document.getElementById("balance").textContent = balance;
}

function atualizarGrafico() {
   
        
      series.data.setAll([
      { value: alimentacaoTotal, category: "Alimentação" },
      { value: moradiaTotal, category: "Moradia" },
      { value: transporteTotal, category: "Transporte" },
      { value: lazerTotal, category: "Lazer" },
      { value: cartaoTotal, category: "Cartão de Crédito" },
      { value: saudeTotal, category: "Saúde" },
      { value: despesasTotal, category: "Despesas pessoais" },
      { value: outrosTotal, category: "Outros" },
      
        ]);
        
      
        
        series.appear(1000, 100);
        
        }// end am5.ready()
    

function addExpense() {
    const description = document.getElementById("expense-description").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const category = document.getElementById("expense-category").value;
   
    switch (category) {
        case "Alimentação":
            alimentacaoTotal += amount;
            break;
        case "Moradia":
            moradiaTotal += amount;
            break;
        case "Transporte":
            transporteTotal += amount;
            break;
        case "Lazer":
            lazerTotal += amount;
            break;
        case "Outros":
            outrosTotal += amount;
        case "Cartao de Crédito":
            cartaoTotal += amount;
            break;
        case "Saúde":
            saudeTotal += amount;
            break;
         case "Despesas pessoais":
            despesasTotal += amount;
            break;
        
 }


    if (description && amount && !isNaN(amount)) {
        const expense = {
            description,
            amount,
            category
        };

        expenses.push(expense);

        totalExpenses += amount;
        calculateBalance();
        updateExpenseTable();

    }


    console.log("Total de Alimentação: " + alimentacaoTotal);
    console.log("Total de Moradia: " + moradiaTotal);
    console.log("Total de Transporte: " + transporteTotal);
    console.log("Total de Lazer: " + lazerTotal);
    console.log("Total de Saúde: " + saudeTotal);
    console.log("Total de Despesas: " + despesasTotal);
    console.log("Total de Outros: " + outrosTotal);
    console.log("Total de Cartao: " + cartaoTotal);

atualizarGrafico();

saveData();

}

function removeExpense(index) {
   

    const removedExpense = expenses.splice(index, 1)[0];
    totalExpenses -= removedExpense.amount;
    calculateBalance();
   
        // Subtrai o valor da despesa removida da categoria apropriada
        const category = removedExpense.category;
        switch (category) {
            case "Alimentação":
                alimentacaoTotal -= removedExpense.amount;
                break;
            case "Moradia":
                moradiaTotal -= removedExpense.amount;
                break;
            case "Transporte":
                transporteTotal -= removedExpense.amount;
                break;
            case "Lazer":
                lazerTotal -= removedExpense.amount;
                break;
            case "Outros":
                outrosTotal -= removedExpense.amount;
                break;
            case "Cartao de Crédito":
                cartaoTotal -= removedExpense.amount;
                break;
            case "Saúde":
                    saudeTotal -= removedExpense.amount;
                    break;
            case "Despesas pessoais":
                despesasTotal -= removedExpense.amount;
                break;
            // Adicione mais casos conforme necessário para outras categorias
        }
    updateExpenseTable();
    atualizarGrafico();
    saveData();
}

function updateExpenseTable() {
    const table = document.getElementById("expense-table");
    table.innerHTML = "";

    expenses.forEach((expense, index) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        var dataAtual = new Date();
        var dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear() }`

        cell1.textContent = expense.description;
        cell2.textContent = expense.amount;
        cell3.textContent = expense.category;
        cell5.textContent = dataFormatada;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.addEventListener("click", () => removeExpense(index));
        cell4.appendChild(removeButton);
    });
}




    function calculateBalance() {
        salary = parseFloat(document.getElementById("salary").value) || 0;
        const balance = salary - totalExpenses;
        document.getElementById("total-expenses").textContent = totalExpenses;

        const balanceElement = document.getElementById("balance");
        balanceElement.textContent = balance;

        if (balance >= 0) {
            balanceElement.style.color = "green"; // Saldo positivo (verde)
        } else {
            balanceElement.style.color = "red"; // Saldo negativo (vermelho)
        }
    }

    
