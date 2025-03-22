import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiky1i346MS8w-S9fwyxvQ4zVy_Y3pSnY",
  authDomain: "playground-f462b.firebaseapp.com",
  projectId: "playground-f462b",
  storageBucket: "playground-f462b.firebasestorage.app",
  messagingSenderId: "1034492625686",
  appId: "1:1034492625686:web:30462a74efd373f3934637",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Separate visibility manager for toggling form visibility
const visibilityManager = {
  toggleIncomeForm: (show) => {
    const incomeForm = document.getElementById("incomeForm");
    if (incomeForm) {
      incomeForm.classList.toggle("hidden", !show);
    }
  },

  toggleExpenseForm: (show) => {
    const expenseForm = document.getElementById("expenseForm");
    if (expenseForm) {
      expenseForm.classList.toggle("hidden", !show);
    }
  },
};

let bdg = {
  fIncomeSource: null,
  fIncomeAmt: null,
  hIncomeForm: null,
  fExpenseTxt: null,
  fExpenseAmt: null,
  fExpenseCategory: null,
  hExpenseForm: null,
  selectedMonth: null,
  balanceElement: null,
  listIncomeElement: null, // Corrected list id for income
  listExpenseElement: null, // Corrected list id for expense

  init: () => {
    // Income Form Elements
    bdg.fIncomeSource = document.getElementById("incomeFormSource");
    bdg.fIncomeAmt = document.getElementById("incomeFormAmt");
    bdg.hIncomeForm = document.getElementById("incomeForm");

    // Expense Form Elements
    bdg.fExpenseTxt = document.getElementById("expenseFormTxt");
    bdg.fExpenseAmt = document.getElementById("expenseFormAmt");
    bdg.fExpenseCategory = document.getElementById("expenseFormCategory");
    bdg.hExpenseForm = document.getElementById("expenseForm");

    // Summary Elements
    bdg.balanceElement = document.getElementById("balanceAm");
    bdg.incomeElement = document.getElementById("incomeAm"); // Agregamos referencia para Income
    bdg.expenseElement = document.getElementById("expenseAm");

    // Balance and list elements
    bdg.listIncomeElement = document.getElementById("listIncome"); // Corrected list element for income
    bdg.listExpenseElement = document.getElementById("listExpense"); // Corrected list element for expense

    // Check if the balance element and list elements are found in the DOM
    if (
      !bdg.balanceElement ||
      !bdg.listIncomeElement ||
      !bdg.listExpenseElement
    ) {
      console.error("Balance or list element not found!");
      return; // Stop initialization if balance or list elements are missing
    }

    // Month Select Element
    const monthSelect = document.getElementById("monthSelect");

    // Get current year and create an array of months
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Array of month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Populate the month dropdown with the months of the current year
    months.forEach((month, index) => {
      const option = document.createElement("option");
      option.value = `${currentYear}-${index + 1}`; // Value is "Year-Month"
      option.textContent = `${month} ${currentYear}`;
      monthSelect.appendChild(option);
    });

    // Set the current month as the default selected value
    const currentMonthIndex = currentDate.getMonth();
    monthSelect.value = `${currentYear}-${currentMonthIndex + 1}`;

    // Event listener for month selection change (to fetch entries)
    monthSelect.addEventListener("change", (e) => {
      bdg.selectedMonth = e.target.value; // Save the selected month
      console.log("Selected month", bdg.selectedMonth);
      bdg.fetchEntries(); // Fetch entries when month is changed
      console.log("Selected Month:", bdg.selectedMonth);
    });
  },

  fetchEntries: async () => {
    if (!bdg.selectedMonth) return; // If no month is selected, exit

    // Correctly split the selected month into year and month index
    const [year, monthIndex] = bdg.selectedMonth.split("-");
    const month = parseInt(monthIndex) - 1; // Month is 0-based in JavaScript

    // Create start and end dates for the selected month
    const startDate = new Date(year, month, 1); // Start of the month
    const endDate = new Date(year, month + 1, 1); // Start of the next month

    // Convert the JavaScript Date objects into Firestore Timestamps
    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);

    try {
      // Query Firestore for entries in the selected month
      const q = query(
        collection(db, "entradas"),
        where("date", ">=", startTimestamp),
        where("date", "<", endTimestamp)
      );

      // Execute the query and get the results
      const querySnapshot = await getDocs(q);
      let totalIncome = 0;
      let totalExpense = 0;

      // Clear previous entries from the UI
      bdg.listIncomeElement.innerHTML = "";
      bdg.listExpenseElement.innerHTML = "";

      // Loop through the Firestore documents and display them
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Creating and styling the delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.style.fontSize = "12px";
        deleteButton.style.color = "white";
        deleteButton.style.backgroundColor = "red";
        deleteButton.style.border = "none";
        deleteButton.style.padding = "5px";
        deleteButton.style.marginLeft = "5px";
        deleteButton.style.cursor = "pointer";

        // Create a new div for each entry
        const entryItem = document.createElement("div");
        entryItem.textContent = `${data.source || data.t} ${
          data.s === "+" ? "(Income)" : "(Expense)"
        }: $${data.a}`;

        // Attach the click event to delete the entry
        deleteButton.addEventListener("click", async () => {
          await bdg.deleteEntry(doc.id); // Deleting entry from FStore
          bdg.fetchEntries();
        });

        // Add the delete button to the entry item
        entryItem.appendChild(deleteButton);

        // Add the entry to the appropriate list (Income or Expense)
        if (data.s === "+") {
          bdg.listIncomeElement.appendChild(entryItem);
          totalIncome += data.a;
        } else if (data.s === "-") {
          bdg.listExpenseElement.appendChild(entryItem);
          totalExpense += data.a;
        }
      });

      // Calculate and display balance
      const balance = totalIncome - totalExpense;
      bdg.incomeElement.textContent = `$${totalIncome.toFixed(2)}`;
      bdg.expenseElement.textContent = `$${totalExpense.toFixed(2)}`;
      bdg.balanceElement.textContent = `$${balance.toFixed(2)}`;

      console.log("Total Income:", totalIncome);
      console.log("Total Expense:", totalExpense);
      console.log("Balance:", balance);
    } catch (e) {
      console.error("Error fetching entries: ", e);
    }
  },

  // Method to delete an entry from Firestore
  deleteEntry: async function (docId) {
    try {
      await deleteDoc(doc(db, "entradas", docId));
      console.log("Entry deleted:", docId);
    } catch (e) {
      console.error("Error deleting entry: ", e);
    }
  },

  saveIncome: async () => {
    if (!bdg.selectedMonth) {
      console.error("No month selected.");
      return; // Exit the function if no month is selected
    }
    const selectedDateParts = bdg.selectedMonth.split("-"); // Extract Year and Month from selected value
    const selectedYear = selectedDateParts[0];
    const selectedMonth = parseInt(selectedDateParts[1]) - 1; // Month is 0-based in Date constructor

    const date = new Date(selectedYear, selectedMonth, 1); // First day of selected month

    let data = {
      s: "+", // Income symbol (positive)
      t: "", // Title/Description (empty for now)
      a: parseFloat(bdg.fIncomeAmt.value), // Amount (converted to float)
      c: "", // Category (empty for now)
      source: bdg.fIncomeSource.value, // Source of income (from form input)
      date: Timestamp.fromDate(date), // Use the selected month date as the Timestamp
    };

    try {
      // Add income data to Firestore
      const docRef = await addDoc(collection(db, "entradas"), data);
      console.log("Income document written with ID: ", docRef.id);

      // Clear form and hide the income form after submission
      bdg.clearForm(); // Clear form after submitting
      visibilityManager.toggleIncomeForm(false); // Hide form after saving

      // Re-fetch entries to update the UI
      bdg.fetchEntries();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  saveExpense: async () => {
    if (!bdg.selectedMonth) {
      console.error("No month selected.");
      return; // Exit the function if no month is selected
    }
    const selectedDateParts = bdg.selectedMonth.split("-"); // Extract Year and Month from selected value
    const selectedYear = selectedDateParts[0];
    const selectedMonth = parseInt(selectedDateParts[1]) - 1; // Month is 0-based in Date constructor

    const date = new Date(selectedYear, selectedMonth, 1); // First day of selected month

    let data = {
      s: "-", // Expense symbol (negative)
      t: bdg.fExpenseTxt.value, // Description of the expense
      a: parseFloat(bdg.fExpenseAmt.value), // Amount (converted to float)
      c: bdg.fExpenseCategory.value, // Category (from dropdown)
      source: "", // No source for expense
      date: Timestamp.fromDate(date), // Use the selected month date as the Timestamp
    };

    try {
      // Add expense data to Firestore
      const docRef = await addDoc(collection(db, "entradas"), data);
      console.log("Expense document written with ID: ", docRef.id);

      // Clear form and hide the expense form after submission
      bdg.clearExpenseForm(); // Clear expense form after submitting
      visibilityManager.toggleExpenseForm(false); // Hide form after saving

      // Re-fetch entries to update the UI
      bdg.fetchEntries();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  // Helper functions for clearing forms
  clearForm: () => {
    bdg.fIncomeAmt.value = "";
    bdg.fIncomeSource.value = "";
  },

  clearExpenseForm: () => {
    bdg.fExpenseTxt.value = "";
    bdg.fExpenseAmt.value = "";
    bdg.fExpenseCategory.value = "";
  },
};

// Event listeners for toggles and form submissions
window.onload = () => {
  bdg.init();

  // Add event listener for New Income Button
  document.getElementById("newIncomeBtn").addEventListener("click", () => {
    visibilityManager.toggleIncomeForm(true);
  });

  // Add event listener for New Expense Button
  document.getElementById("newExpenseBtn").addEventListener("click", () => {
    visibilityManager.toggleExpenseForm(true);
  });

  // Event listener for form submissions
  bdg.hIncomeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    bdg.saveIncome();
  });

  bdg.hExpenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    bdg.saveExpense();
  });

  // Add event listener for closing forms
  document.getElementById("incomeFormEnd").addEventListener("click", () => {
    visibilityManager.toggleIncomeForm(false);
  });

  document.getElementById("expenseFormEnd").addEventListener("click", () => {
    visibilityManager.toggleExpenseForm(false);
  });
};
