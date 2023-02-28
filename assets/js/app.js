const easyBtn = document.querySelector('.easy');
const hardBtn = document.querySelector('.hard');
const newGameBtn = document.querySelector('.new-game');

const cardList = document.querySelector('main');
for (let card of cardList.children) {
    card.addEventListener('click', () => {
        guess(card);
    });
}

const colors = [];
let guessColor = '';


const toggleSelectedBtn = (btn) => {
    easyBtn.classList.toggle('selected');
    hardBtn.classList.toggle('selected');
}

const randColor = () => {
    return Math.floor(Math.random()*16777215).toString(16);
}

const clearMarks = (cardList) => {
    for (let card of cardList.children) {
        if (card.children.length > 0) card.removeChild(card.children[0]);
    }
}

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const hexToRgb = (hex) => {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

function rgbToHex(col)
{
    if(col.charAt(0)==='r')
    {
        col=col.replace('rgb(','').replace(')','').split(',');
        let r=parseInt(col[0], 10).toString(16);
        let g=parseInt(col[1], 10).toString(16);
        let b=parseInt(col[2], 10).toString(16);
        r=r.length===1?'0'+r:r; g=g.length===1?'0'+g:g; b=b.length===1?'0'+b:b;
        return r + g + b;
    }
}
const updateUI = () => {
    for (let i = 0; i < 6; i++) {
        const color = document.querySelector(`.color-${i+1}`);
        color.style.backgroundColor = `#${colors[i]}`;
    }
    document.querySelector('.guess-color').textContent = `RGB (${hexToRgb(guessColor)})`;
}

Array.prototype.clear = function() {
    this.length = 0;
}

const newGame = () => {
    guessColor = randColor();
    colors.clear();
    colors.push(guessColor);
    for (let i = 0; i < 5; i++) {
        colors.push(randColor());
    }
    shuffleArray(colors);
    clearMarks(cardList);
    updateUI();
}

const guess = (card) => {
    if (card.children.length > 0) {
        return;
    }
    if (rgbToHex(card.style.backgroundColor) === guessColor) {
        const image = document.createElement('img');
        image.src = 'assets/images/check.png';
        image.alt = 'You won!';
        card.appendChild(image);
    } else {
        const image = document.createElement('img');
        image.src = 'assets/images/error.png';
        image.alt = 'You lost!';
        card.appendChild(image);
    }
}

easyBtn.addEventListener('click', toggleSelectedBtn);
hardBtn.addEventListener('click', toggleSelectedBtn);

newGameBtn.addEventListener('click', newGame);