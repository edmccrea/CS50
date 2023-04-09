const cardInput = document.querySelector('input')
const resultDisplay = document.querySelector('h2')
const submit = document.querySelector('button')
const cardIcon = document.querySelector('.iconActual')

const cardIcons = ['fa-cc-amex', 'fa-cc-mastercard','fa-cc-visa']

let card = {
    number: cardInput.value,
    type: 'None',
    isValid: false
};


function cardType(num) {
    if (num.substring(0, 2) === '34' || num.substring(0, 2) === '37'){
        card.type = 'Amex';
        cardIcon.classList.add(cardIcons[0]);
    } else if (num.substring(0, 2) > '50' && num.substring(0, 2) < '56') {
        card.type = 'MasterCard';
        cardIcon.classList.add(cardIcons[1]);
    } else if (num.charAt(0) === '4'){
        card.type = 'Visa';
        cardIcon.classList.add(cardIcons[2]);
    } else {
        card.type = 'Unknown'
    }
}

function numCheck(num) {
    let test = num.replace(/\s+/g,'').split('').map(Number);
    if (test.length >= 13 && test.length <= 16){
        let newNum = Number(test.join(''));
        if (typeof newNum === 'number' && isNaN(newNum) === false){
            return true
        } else {
            card.isValid = false
            resultDisplay.innerText = 'Not a valid number';
        }
    } else {
        card.isValid = false
        resultDisplay.innerText = 'Number must be between 13 and 16 digits';
    }
}

function reset(){
    cardIcon.classList = 'iconActual fab';
}

function luhnCheck(num){
    reset()
    let numOne = '', numTwo = '', numThree = '';
    if (numCheck(num)) {
        num = num.replace(/\s+/g,'')
        cardType(num)
        if (num.length % 2 !== 0) {
            numThree = Number(num.charAt(0));
        }
        
        for (let i = num.length - 2; i >= 0; i -= 2){
            numOne += num.charAt(i)*2;
        }
        let arrayOne = numOne.split('').map(Number).reduce((a, b) => a + b, 0)
        
        for (let i = num.length - 1; i > 0; i -= 2){
            numTwo += num.charAt(i);
        }

        let arrayTwo = numTwo.split('').map(Number).reduce((a, b) => a + b, 0);
        
        let sum = arrayOne + arrayTwo + numThree;
        if (sum % 10 === 0){
            resultDisplay.innerText = 'Valid Card!';
            card.isValid = true
        } else {
            resultDisplay.innerText = 'Invalid Card!';
        }
    } else {
        numCheck(num)
    }
}

submit.addEventListener('click', () => {
        card.number = cardInput.value
        luhnCheck(card.number)
        console.log(card)
})

numCheck('4921 8197 9971 0281')

