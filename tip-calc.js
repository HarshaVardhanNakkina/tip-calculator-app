const billForm = document.querySelector('.bill__form');
billForm.addEventListener('submit', event => event.preventDefault());

const billInput = document.querySelector('#total');
let billAmount = billInput.value || 0;
billInput.addEventListener('input', event => {
  let {
    target: { value }
  } = event;
  if (value === '') billAmount = 0;
  else billAmount = parseFloat(value);
  updateBill(billAmount, tipAmount, billPeople);
});

const peopleInput = document.querySelector('#people');
let billPeople = peopleInput.value || 0;
peopleInput.addEventListener('input', event => {
  let {
    target: { value }
  } = event;

  if (value === '') billPeople = 0;
  else billPeople = parseInt(value);
  updateBill(billAmount, tipAmount, billPeople);
});

let tipAmount = 0;
let tipPercentage = 0;
const tipSelector = document.querySelector('.btn-group__container');
tipSelector.addEventListener('click', event => {
  if (event.target.nodeName === 'BUTTON') {
    tipPercentage = parseInt(event.target.getAttribute('data-value'));
    if (billAmount > 0) tipAmount = (billAmount * tipPercentage) / 100;
    updateBill(billAmount, tipAmount, billPeople);
  }
});

tipSelector.addEventListener('input', event => {
  let {
    target: { value }
  } = event;
  if (value === '') tipAmount = 0;
  else tipAmount = parseInt(event.target.value);
  updateBill(billAmount, tipAmount, billPeople);
});

const tipAmountField = document.querySelector('.summary__amount--tip');
const billAmountField = document.querySelector('.summary__amount--bill');

function updateBill(billAmount, tipAmount, billPeople) {
  if (billPeople > 0) {
    tipAmountField.innerHTML = '$' + (tipAmount / billPeople).toFixed(2);
    billAmountField.innerHTML = '$' + (billAmount / billPeople).toFixed(2);
  } else {
    tipAmountField.innerHTML = '$0.00';
    billAmountField.innerHTML = '$0.00';
  }
}

updateBill(billAmount, tipAmount, billPeople);
