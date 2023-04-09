const optionsContainer = document.querySelector('.options-container');
const mainContainer = document.querySelector('.main');
const resultsContainer = document.querySelector('.results');
const encipherBtn = document.querySelector('.encipher');
const decipherBtn = document.querySelector('.decipher');
const choiceBtns = document.querySelectorAll('#choice');
const keyInput = document.querySelector('.key');
const stringInput = document.querySelector('.string');
const submitBtn = document.querySelector('.submit');
const resultTitle = document.querySelector('.resultTitle')
const resultText = document.querySelector('.resultText');
const restartBtn = document.querySelector('.restart');

let chosen = '';
let cipherStr = '';

//Change inout screen based on choice
function clicked(chosen) {
    optionsContainer.style.display = 'none';
    mainContainer.style.display = 'flex';
    stringInput.placeholder = `Enter code to ${chosen} here`;
    submitBtn.innerText = `${chosen.charAt(0).toUpperCase() + chosen.slice(1)}`;
}

//Encipher or decipher a string
function cipher() {
    let str = stringInput.value.split('');
    let key = Number(keyInput.value);
    if (key > 0 && key < 26){
        keyInput.classList.remove('error')
        if (chosen === 'encipher'){['']
            for (let letter in str){
                let char = str[letter].charCodeAt(0)
                if (char >= 65 && char <= 90){
                    if (char + key > 90){
                        char = 64 + (90 - char);
                    }
                    char += key;
                } else  if (char >= 97 && char <= 122){
                    if (char + key > 122){
                        char = 96 + (char - 122);
                    }
                    char += key;
                }
                cipherStr += String.fromCharCode(char);
            }
            results()
        } else if (chosen === 'decipher'){
            for (let letter in str){
                let char = str[letter].charCodeAt(0)
                if (char >= 65 && char <= 90){
                    if (char - key < 65){
                        char = 91 - (65 - char);
                    }
                    char -= key;
                } else  if (char >= 97 && char <= 122){
                    if (char - key < 97){
                        char = 123 - (97 - char);
                    }
                    char -= key;
                }
                cipherStr += String.fromCharCode(char);
            }
            results();
        }
       } else {
        keyInput.value = ''
        keyInput.classList.add('error')
    }
}

//Display results
function results() {
    mainContainer.style.display = 'none';
    resultsContainer.style.display = 'flex';
    resultTitle.innerText = `${chosen.charAt(0).toUpperCase() + chosen.slice(1)}ed text:`;
    resultText.innerText = cipherStr;
}

function restart(){
    chosen = '';
    cipherStr = '';
    resultsContainer.style.display = 'none';
    optionsContainer.style.display = 'flex';
    stringInput.value = '';
    keyInput.value = '';
}

for (let i = 0; i < choiceBtns.length; i++){
    choiceBtns[i].addEventListener('click', () => {
        chosen = choiceBtns[i].innerText.toLowerCase();
        clicked(chosen);
    })
}

submitBtn.addEventListener('click', cipher);
restartBtn.addEventListener('click', restart);