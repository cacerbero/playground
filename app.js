import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

// Your web app's Firebase configuration
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

async function addTestDataToFirebase() {
  //object to be added
  const testData = [
    {
      name: "Test 1",
      amount: 100,
      category: "Needs",
      date: new Date().toISOString(),
    },
    {
      name: "Test 2",
      amount: 150,
      category: "Wants",
      date: new Date().toISOString(),
    },
    {
      name: "Test 3",
      amount: 200,
      category: "Culture",
      date: new Date().toISOString(),
    },
    {
      name: "Test 4",
      amount: 50,
      category: "Unexpected",
      date: new Date().toISOString(),
    },
    {
      name: "Test 5",
      amount: 250,
      category: "Needs",
      date: new Date().toISOString(),
    },
  ];

  // Reference to your Firebase collection (change 'test' to your desired collection name)
  const collectionRef = collection(db, "test");

  // Add each test entry to the collection
  for (const data of testData) {
    try {
      const docRef = await addDoc(collectionRef, data); // Correct usage of addDoc
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

// Call the function to add the data to Firebase
addTestDataToFirebase();

const testData = {
  s: "-",
  t: "Coffee for breakfast", // Description (replace with your own data)
  a: 5.99, // Amount (replace with your own value)
  c: "wants", // Category (replace with your own choice)
  source: "cash", // Source (or leave blank as needed)
  date: new Date().toISOString(), // Current date in ISO format
};

async function agregarEntrada(S1, T1, A1, C1, Su1, D1) {
  try {
    const docRef = await addDoc(collection(db, "entradas"), {
      s: S1,
      t: T1,
      a: A1,
      c: C1,
      source: Su1,
      date: D1,
    });
    console.log("Documento escrito con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al añadir documento: ", e);
  }
}

let bdg = {
  data: null,
  hBal: null,
  hInc: null,
  hExp: null,
  hList: null,
  hIncomeForm: null,
  hExpenseForm: null,
  fIncomeID: null,
  fIncomeSource: null,
  fIncomeAmt: null,
  fExpenseID: null,
  fExpenseTxt: null,
  fExpenseAmt: null,
  fExpenseCategory: null,
  selectedMonth: null,

  init: () => {
    bdg.hBal = document.getElementById("balanceAm");
    bdg.hInc = document.getElementById("incomeAm");
    bdg.hExp = document.getElementById("expenseAm");
    bdg.hList = document.getElementById("list");
    bdg.hIncomeForm = document.getElementById("incomeForm");
    bdg.hExpenseForm = document.getElementById("expenseForm");
    bdg.fIncomeID = document.getElementById("incomeFormID");
    bdg.fIncomeSource = document.getElementById("incomeFormSource");
    bdg.fIncomeAmt = document.getElementById("incomeFormAmt");
    bdg.fExpenseID = document.getElementById("expenseFormID");
    bdg.fExpenseTxt = document.getElementById("expenseFormTxt");
    bdg.fExpenseAmt = document.getElementById("expenseFormAmt");
    bdg.fExpenseCategory = document.getElementById("expenseFormCategory");

    bdg.entries = localStorage.getItem("entries");
    if (bdg.entries == null) {
      bdg.entries = [];
    } else {
      bdg.entries = JSON.parse(bdg.entries);
    }

    const monthSelect = document.getElementById("monthSelect");
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(currentDate.getFullYear(), i);
      const monthString = month.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      months.push(monthString);
    }

    monthSelect.innerHTML = "";
    months.forEach((month) => {
      const option = document.createElement("option");
      option.value = month;
      option.textContent = month;
      monthSelect.appendChild(option);
    });

    monthSelect.value = currentMonth;
    bdg.selectedMonth = currentMonth;

    monthSelect.addEventListener("change", (e) => {
      bdg.selectedMonth = e.target.value;
      bdg.draw();
    });

    bdg.draw();

    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      console.log("Service Worker is controlling the page");
    }
  },

  toggleIncome: (id) => {
    console.log("Toggle income function called with id:", id);
    if (id === false) {
      bdg.fIncomeID.value = "";
      bdg.fIncomeSource.value = "";
      bdg.fIncomeAmt.value = "";
      bdg.hIncomeForm.classList.add("hidden");
    } else {
      if (Number.isInteger(id)) {
        bdg.fIncomeID.value = id;
        bdg.fIncomeSource.value = bdg.entries[id].source;
        bdg.fIncomeAmt.value = bdg.entries[id].a;
      }
      bdg.hIncomeForm.classList.remove("hidden");
    }
  },

  toggleExpense: (id) => {
    console.log("Toggle expense function called with id:", id);
    if (id === false) {
      bdg.fExpenseID.value = "";
      bdg.fExpenseTxt.value = "";
      bdg.fExpenseAmt.value = "";
      bdg.fExpenseCategory.value = "needs";
      bdg.hExpenseForm.classList.add("hidden");
    } else {
      if (Number.isInteger(id)) {
        bdg.fExpenseID.value = id;
        bdg.fExpenseTxt.value = bdg.entries[id].t;
        bdg.fExpenseAmt.value = bdg.entries[id].a;
        bdg.fExpenseCategory.value = bdg.entries[id].c;
      }
      bdg.hExpenseForm.classList.remove("hidden");
    }
  },

  draw: () => {
    let bal = 0,
      inc = 0,
      exp = 0,
      row;

    bdg.hList.innerHTML = "";
    bdg.entries.forEach((entry, i) => {
      const entryDate = new Date(entry.date);
      const entryMonth = entryDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (entryMonth === bdg.selectedMonth) {
        if (entry.s == "+") {
          inc += entry.a;
          bal += entry.a;
        } else {
          exp += entry.a;
          bal -= entry.a;
        }
        row = document.createElement("div");
        row.className = `entry ${entry.s == "+" ? "income" : "expense"}`;
        row.innerHTML = `<div class="eDel" onclick="bdg.del(${i})">X</div>
        <div class="eTxt">${entry.t || entry.source}</div>
        <div class="eCat">${entry.c || ""}</div>
        <div class="eAmt">$${parseFloat(entry.a).toFixed(2)}</div>
        <div class="eEdit" onclick="bdg.toggle(${i})">&#9998;</div>`;
        bdg.hList.appendChild(row);
      }
    });

    bdg.hBal.innerHTML =
      bal < 0 ? `-$${Math.abs(bal).toFixed(2)}` : `$${bal.toFixed(2)}`;
    bdg.hInc.innerHTML = `$${inc.toFixed(2)}`;
    bdg.hExp.innerHTML = `$${exp.toFixed(2)}`;
  },

  saveIncome: () => {
    let data = {
      s: "+",
      t: "",
      a: parseFloat(bdg.fIncomeAmt.value),
      c: "",
      source: bdg.fIncomeSource.value,
      date: new Date().toISOString(),
    };

    if (bdg.fIncomeID.value == "") {
      bdg.entries.push(data);
    } else {
      bdg.entries[parseInt(bdg.fIncomeID.value)] = data;
    }
    localStorage.setItem("entries", JSON.stringify(bdg.entries));

    bdg.toggleIncome(false);
    bdg.draw();
    return false;
  },

  saveExpense: () => {
    // let data = {
    //   s: "-",
    //   t: bdg.fExpenseTxt.value,
    //   a: parseFloat(bdg.fExpenseAmt.value),
    //   c: bdg.fExpenseCategory.value,
    //   source: "",
    //   date: new Date().toISOString(),
    // };

    agregarEntrada(
      "-",
      bdg.fExpenseTxt.value,
      parseFloat(bdg.fExpenseAmt.value),
      bdg.fExpenseCategory.value,
      "",
      new Date().toISOString()
    );

    // if (bdg.fExpenseID.value == "") {
    //   bdg.entries.push(data);
    // } else {
    //   bdg.entries[parseInt(bdg.fExpenseID.value)] = data;
    // }
    // localStorage.setItem("entries", JSON.stringify(bdg.entries));

    // bdg.toggleExpense(false);
    // bdg.draw();
    // return false;
  },

  del: (id) => {
    if (confirm("Delete entry?")) {
      bdg.entries.splice(id, 1);
      localStorage.setItem("entries", JSON.stringify(bdg.entries));
      bdg.draw();
    }
  },
};

window.onload = bdg.init;
