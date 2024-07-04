let score = 0;
const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');
const upgrade1 = document.getElementById('upgrade1');

clickButton.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
});

upgrade1.addEventListener('click', () => {
    if (score >= 10) {
        score -= 10;
        scoreDisplay.textContent = score;
        // Додати функціональність апгрейду
    }
});
