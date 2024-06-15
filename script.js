import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, onValue, push, ref, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL: 'https://playground-8f28f-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList');

const form = document.getElementById('shopping-form');
const inputField = document.getElementById('input-field');
const shoppingList = document.getElementById('shopping-list');

onValue(shoppingListInDB, snapshot => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    clearShoppingList();
    const arrayItems = Object.entries(data);
    arrayItems.forEach(item => {
      appendLiInShoppingList(item);
    });
  } else {
    clearShoppingList();
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const inputValue = inputField.value;
  if (inputValue.trim()) {
    push(shoppingListInDB, inputValue);
  }
  inputField.value = '';
});

function appendLiInShoppingList(idValueArr) {
  const [id, value] = idValueArr;
  const li = document.createElement('li');
  li.innerText = value;
  li.addEventListener('dblclick', () => {
    const exactLocation = ref(database, `shoppingList/${id}`);
    remove(exactLocation);
  });
  shoppingList.appendChild(li);
}

function clearShoppingList() {
  shoppingList.innerHTML = '';
}
