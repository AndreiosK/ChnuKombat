let score = 0;
let points = 0;
let additionalClicks = 0;
const clickImage = document.getElementById('clickImage');
const scoreDisplay = document.getElementById('score');
const pointsDisplay = document.getElementById('points');
const clickFeedback = document.getElementById('clickFeedback');
const exchangePointsButton = document.getElementById('exchangePoints');
const exchangeClicksButton = document.getElementById('exchangeClicks');
const improvementsButton = document.getElementById('improvementsButton');
const improvementsDropdown = document.getElementById('improvementsDropdown');
const telegramIdInput = document.getElementById('telegramId');

clickImage.addEventListener('click', () => {
    const totalClicks = 1 + additionalClicks;
    points += totalClicks;
    pointsDisplay.textContent = points;

    // Показати анімацію зворотного зв'язку
    clickImage.style.transform = 'scale(1.1)';
    setTimeout(() => {
        clickImage.style.transform = 'scale(1)';
    }, 100);

    // Показати зворотний зв'язок
    clickFeedback.textContent = `+${totalClicks}`;
    clickFeedback.style.opacity = 1;
    setTimeout(() => {
        clickFeedback.style.opacity = 0;
    }, 500);

    saveUserData();
});

// Обміняти 1000 очок на 0.005 балів
exchangePointsButton.addEventListener('click', () => {
    if (points >= 1000) {
        points -= 1000;
        score += 0.005;
        scoreDisplay.textContent = score.toFixed(3);
        pointsDisplay.textContent = points;
        saveUserData();
    } else {
        alert('Недостатньо очок для обміну!');
    }
});

// Обміняти 10000 очок на додатковий клік
exchangeClicksButton.addEventListener('click', () => {
    if (points >= 10000) {
        points -= 10000;
        additionalClicks += 1;
        scoreDisplay.textContent = score;
        pointsDisplay.textContent = points;
        saveUserData();
    } else {
        alert('Недостатньо очок для обміну!');
    }
});

// Перемикання меню покращень
improvementsButton.addEventListener('click', () => {
    improvementsDropdown.classList.toggle('show');
});

function saveUserData() {
    const telegramId = telegramIdInput.value;
    if (telegramId) {
        fetch('/update_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                telegram_id: telegramId,
                score: score,
                points: points,
                additional_clicks: additionalClicks
            })
        });
    }
}

function loadUserData() {
    const telegramId = telegramIdInput.value;
    if (telegramId) {
        fetch('/get_user_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                telegram_id: telegramId
            })
        })
        .then(response => response.json())
        .then(data => {
            score = data.score;
            points = data.points;
            additionalClicks = data.additional_clicks;
            scoreDisplay.textContent = score;
            pointsDisplay.textContent = points;
        });
    }
}
