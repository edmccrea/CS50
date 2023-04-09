const cost = document.querySelector('.cost');
const amountInput = document.querySelector('.amount-given');
const submit = document.querySelector('.submit');
const returnedHeading = document.querySelectorAll('h2');
const returnedAmount = document.querySelector('.coins-returned');
const amountReturned = document.querySelector('.amount-returned');
const coinAmounts = document.querySelector('.coin-amounts');
const restart = document.querySelector('.restart');
const changeAvailable = document.querySelector('.change-available');
const add = document.querySelector('.add');
const remove = document.querySelector('.remove');
const addBtn = document.querySelector('.add-btn');
const removeBtn = document.querySelector('.remove-btn');


let coinSet = [0.25, 0.10, 0.05, 0.01];
let coins = 0;

function addCoin(){
    if (!coinSet.includes(Number(add.value))){
        coinSet.push(Number(add.value));
        add.value = '';
        arrangeChange();
        displayAvailable();
        add.value = '';
        remove.value = ''
        if (remove.classList.contains('not-possible')){
            remove.classList.toggle('not-possible');
        }
    } else {
        add.classList.toggle('not-possible');
        add.value = 'Already available';
    }
}   

function removeCoin(){
    if (coinSet.includes(Number(remove.value))){
        coinSet = coinSet.filter(item => item !== Number(remove.value));
        remove.value = '';
        arrangeChange();
        displayAvailable();
        remove.value = '';
        add.value = '';
        if (add.classList.contains('not-possible')){
            add.classList.toggle('not-possible');
        }
    } else {
        remove.classList.toggle('not-possible');
        remove.value = 'Not found';
    }
}   



function arrangeChange(){
    coinSet.sort((a, b) => b - a);
}

function displayAvailable() {
    temp = '';
    for (let i = 0; i < coinSet.length; i++) {
        temp += `$${coinSet[i].toFixed(2)} `;
        changeAvailable.innerText = `Change available: ${temp} `;
    }
}

displayAvailable();

function changeDue() {
    let num = Number(amountInput.value -cost.value) * 100;
    let returnValue = Number(amountInput.value -cost.value);
    returnedAmount.innerText = '';
    if (typeof num === 'number' && num > 0) {
        let amounts = '';
        for (let i = 0; i < coinSet.length; i++) {
            let modifier = 0;
            while (num >= coinSet[i] * 100) {
                coins ++;
                modifier++;
                num -= coinSet[i] * 100;
            }
            if (modifier > 0){
            amounts += `${modifier} in $${coinSet[i].toFixed(2)}\n`;
            }
        }
        cost.style.display = 'none';
        amountInput.style.display = 'none';
        submit.style.display = 'none';
        for (heading of returnedHeading) {
            heading.style.display = 'block';
        }
        returnedAmount.innerText = coins;
        amountReturned.innerText = `$${returnValue.toFixed(2)}`;
        coinAmounts.innerText = amounts;
        restart.style.display = 'block';
        coins = 0;
    } else {
        returnedAmount.innerText = 'Please enter valid numbers!';
    }
}

function refresh(){
    cost.value = '';
    amountInput.value = '';
    cost.style.display = 'block';
    amountInput.style.display = 'block';
    submit.style.display = 'block';
    returnedAmount.innerText = '';
    amountReturned.innerText = ''
    coinAmounts.innerText = '';
    restart.style.display = 'none';
    for (heading of returnedHeading) {
        heading.style.display = 'none';
    }
}

submit.addEventListener('click', changeDue);
restart.addEventListener('click', refresh);
addBtn.addEventListener('click', addCoin);
removeBtn.addEventListener('click', removeCoin);


