const easyBtn = document.querySelector('.easy');
const hardBtn = document.querySelector('.hard');
const newGameBtn = document.querySelector('.new-game');
const cardList = document.querySelector('main');
const scoreDiv = document.querySelector('.score');
const successAlertSound = new Audio('assets/sounds/success.mp3');
successAlertSound.volume = 0.2;
const EASY_MODE = 6;
const HARD_MODE = 9;
const colors = [];
let guessColor = '';
let score = 0;
let isAlreadyLose = false;


const toggleSelectedBtn = (btn) => {
    easyBtn.classList.toggle('selected');
    hardBtn.classList.toggle('selected');
}

function getRandomColor() {
    let letters = "0123456789abcdef"; // Possible hex digits
    let color = "";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]; // Choose a random digit
    }
    return color;
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
    if (col.charAt(0) === '#')
        return col;

    let nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(col),
        r = parseInt(nums[2], 10).toString(16),
        g = parseInt(nums[3], 10).toString(16),
        b = parseInt(nums[4], 10).toString(16);

    return (
        (r.length === 1 ? "0" + r : r) +
        (g.length === 1 ? "0" + g : g) +
        (b.length === 1 ? "0" + b : b)
    );
}
const updateUI = () => {
    const mode = easyBtn.classList.contains('selected') ? EASY_MODE : HARD_MODE;

    for (let i = 0; i < mode; i++) {
        const color = document.querySelector(`.color-${i+1}`);
        color.style.backgroundColor = `#${colors[i]}`;
    }
    document.querySelector('.guess-color').textContent = `RGB (${hexToRgb(guessColor)})`;
}

Array.prototype.clear = function() {
    this.length = 0;
}

const createCards = () => {
    cardList.innerHTML = '';
    if (easyBtn.classList.contains('selected')) {
        for (let i = 0; i < EASY_MODE; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add(`color-${i+1}`);
            cardList.appendChild(card);
        }
    } else {
        for (let i = 0; i < HARD_MODE; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add(`color-${i+1}`);
            cardList.appendChild(card);
        }
    }
    for (let card of cardList.children) {
        card.addEventListener('click', () => {
            guess(card);
        });
    }
}

const newGame = () => {
    const mode = easyBtn.classList.contains('selected') ? EASY_MODE : HARD_MODE;
    guessColor = getRandomColor();
    isAlreadyLose = false;
    colors.clear();
    colors.push(guessColor);
    for (let i = 0; i < mode - 1; i++) {
        colors.push(getRandomColor());
    }
    createCards();
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
        score++;
        successAlertSound.play();
    } else {
        const image = document.createElement('img');
        image.src = 'assets/images/error.png';
        image.alt = 'You lost!';
        card.appendChild(image);
        if (!isAlreadyLose) {
            score--;
            isAlreadyLose = true;
        }
    }
    scoreDiv.textContent = `Score: ${score}`;
}

easyBtn.addEventListener('click', toggleSelectedBtn);
hardBtn.addEventListener('click', toggleSelectedBtn);

newGameBtn.addEventListener('click', newGame);