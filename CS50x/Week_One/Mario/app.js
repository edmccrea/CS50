const title = document.querySelector('h1');
const input = document.querySelector('input');
const btn = document.querySelector('.submit');
const pyramidDisplay = document.querySelector('p');
const mario = document.querySelector('img');
const restart = document.querySelector('.restart');

let pyramid = ''

function makePyramid() {
    let height = input.value
    for (let i = 0; i < height; i++) {
        for (let j = height - 1; j > i; j--){
            pyramid += ' ';
        }
        for (let j = 0; j < i + 1; j++) {
            pyramid += '#'
        }

        pyramid += '  '

        for (let j = 0; j <= i; j++) {
            pyramid += '#'
        }
        pyramid += '\n'
    }

    return pyramid;
    
}

function showPyramid(){
    makePyramid()
    console.log(input.value)
    console.log(pyramid)
    if (input.value > 0 && input.value < 9){
        title.innerText = "It's-A me, Mario!";
        input.style.display = 'none';
        btn.style.display = 'none';
        mario.src = 'imgs/mario.png'
        pyramidDisplay.innerText = pyramid;
        restart.style.display = 'block'
    } else {
        pyramidDisplay.innerText = 'Number must be between 1 and 8';
        input.value = '';
        pyramid =  ''
    }
}

function refresh(){
    title.innerText = "Choose a Pyramid Height";
    input.style.display = 'block';
    btn.style.display = 'block';
    mario.src = ''
    pyramidDisplay.innerText = '';
    restart.style.display = 'none'
    pyramid = ''
    input.value = ''
}

btn.addEventListener('click', showPyramid)
restart.addEventListener('click', refresh)
