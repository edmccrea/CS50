const infoText = document.querySelector('.info-text')
const candidateForm = document.querySelector('.candidate-form')
const candidateInput = document.querySelector('.candidate-input')
const candidateSubmit = document.querySelector('.candidate-submit')
const errorMsg = document.querySelector('.error-message')
const candidateDisplay = document.querySelector('.candidate-display')
const candidateList = document.querySelector('.candidate-list')
const continueBtn = document.querySelector('.continue-btn')
const continueContainer = document.querySelector('.continue-container')
const voteNumContainer = document.querySelector('.num-of-voters')
const voteNum = document.querySelector('.num-voters')
const voteNumSubmit = document.querySelector('.num-voters-submit')
const voteActual = document.querySelector('.vote-actual')
const voteValue = document.querySelector('.vote-value')
const voteBtn = document.querySelector('.vote-btn')
const resultsContainer = document.querySelector('.results-container')
const first = document.querySelector('.first')
const resetBtn = document.querySelector('.reset')

let candidates = []
let list = ''
let voteCount = 0
let voteCountdown = 0

function setCandidate() {
    if (typeof candidateInput.value === 'string' && candidateInput.value.length > 1){
        let candidate = {name: candidateInput.value, votes: 0}
        candidates.push(candidate)
        candidateInput.value = ''
        if (list === '') {
            list = candidate.name
            candidateList.innerText = list
        } else {
            list += `, ${candidate.name}`
            candidateList.innerText = list
        }
        errorMsg.innerText = ''
    } else {
        errorMsg.innerText = 'Not a valid input'
    }
}

function goToVote() {
    if (candidates.length > 0) {
        candidateForm.style.display = 'none'
        continueContainer.style.display = 'none'
        voteNumContainer.style.display = 'flex'
        infoText.innerText = 'Please input the total number of people who will be voting'
    } else {
        errorMsg.innerText = 'Submit at least one candidate. Preferably more, unless this is a dictatorship, then go ahead.'
    }
}

function voterCount() {
    voteCount = Number(voteNum.value)
    voteCountdown++
    if (!isNaN(voteCount)){
        voteNumContainer.style.display = 'none'
        voteActual.style.display = 'flex'
        infoText.innerText = `Voter number ${voteCountdown} please cast your ballot`
        errorMsg.innerText = ''
    } else {
        voteNum.value = ''
        errorMsg.innerText = 'Not a valid input'
    }
}

function vote() {
    let ballot = voteValue.value
    if(voteCountdown < voteCount) {
        if (candidates.some(e => e.name === ballot)){
            for(let candidate in candidates){
                if (ballot === candidates[candidate].name){
                    candidates[candidate].votes++
                    voteCountdown++
                    errorMsg.innerText = ''
                }
            }
        } else {
            errorMsg.innerText = 'Invalid ballot. Please try again.'
        }
        
        voteValue.value = ''
        infoText.innerText = `Voter number ${voteCountdown} please cast your ballot`
    } else {
        for(let candidate in candidates){
            if (ballot === candidates[candidate].name){
                candidates[candidate].votes++
                results()
            }
        }
    }
}

function results() {
    candidates.sort((a, b) => (b.votes > a.votes) ? 1 : (a.votes > b.votes) ? -1 : 0)
    voteActual.style.display = 'none'
    infoText.style.display = 'none'
    candidateDisplay.style.display = 'none'
    resultsContainer.style.display = 'flex'
    let resultText = ''
    let places = ['first', 'second', 'third']
    
    for (let i = 0; i < 3; i++) {
        if (candidates[i] !== undefined){
            resultText += `${candidates[i].name} was ${places[i]} with ${candidates[i].votes} votes\n`
        }
    }
    first.innerText = resultText
}

function restart(){
    candidates = []
    list = ''
    voteCount = 0
    voteCountdown = 0
    resultText = ''
    voteNum.value = ''
    voteValue.value = ''
    candidateForm.style.display = 'flex'
    continueContainer.style.display = 'flex'
    resultsContainer.style.display = 'none'
    candidateDisplay.style.display = 'flex'
    infoText.style.display = 'block'
    candidateList.innerText = 'None'
    infoText.innerText = "Welcome to our annual vote. First of all we need you to submit the candidates available for this vote. When all are submitted please click 'Continue to Voting'."
}

candidateSubmit.addEventListener('click', setCandidate)
continueBtn.addEventListener('click', goToVote)
voteNumSubmit.addEventListener('click', voterCount)
voteBtn.addEventListener('click', vote)
resetBtn.addEventListener('click', restart)
