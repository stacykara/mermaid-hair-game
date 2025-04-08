/*** СОСТОЯНИЕ ИГРЫ ***/
const gameState = {
    hairColor: null, // Будет установлен при выборе
    hairLength: 5,
    isColorLocked: true,
    // ... остальные параметры
};

/*** ИНИЦИАЛИЗАЦИЯ ***/
function initGame() {
    const savedColor = localStorage.getItem('mermaidHairColor');
    
    if (savedColor) {
        // Если цвет уже выбирали
        gameState.hairColor = savedColor;
        startGame();
    } else {
        // Показываем экран выбора
        document.getElementById('color-selection').style.display = 'block';
        setupColorSelection();
    }
}

/*** ВЫБОР ЦВЕТА ***/
function setupColorSelection() {
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            const selectedColor = this.dataset.color;
            gameState.hairColor = selectedColor;
            localStorage.setItem('mermaidHairColor', selectedColor);
            startGame();
        });
    });
}

function startGame() {
    document.getElementById('color-selection').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    // Инициализация русалки
    document.getElementById('current-mermaid').src = `images/mermaids/${gameState.hairColor}.png`;
    updateUI();
}

/*** ОКРАШИВАНИЕ ***/
function startDyeing() {
    if (!gameState.hasDyeUnlocked) {
        showTip("Купите окрашивание в магазине!");
        return;
    }

    showModal("Выберите новый цвет", `
        <div class="dye-options">
            <div class="dye-option" data-color="black" style="background: #000;"></div>
            <div class="dye-option" data-color="blond" style="background: #FAF0BE;"></div>
            <!-- ... другие цвета ... -->
        </div>
        <p>Длина волос сохранится: ${gameState.hairLength}%</p>
    `);

    document.querySelectorAll('.dye-option').forEach(option => {
        option.addEventListener('click', function() {
            gameState.hairColor = this.dataset.color;
            document.getElementById('current-mermaid').src = `images/mermaids/${gameState.hairColor}.png`;
            saveGame();
            showTip(`Новый цвет волос! (${getColorName(gameState.hairColor)})`);
        });
    });
}

/*** МАГАЗИН ***/
const shopItems = [
    {
        id: "dye",
        name: "Окрашивание",
        price: 200,
        effect: "unlockDye"
    }
    // ... другие товары
];

function unlockDye() {
    gameState.hasDyeUnlocked = true;
    showTip("Теперь вы можете менять цвет волос!");
}

// Запуск игры
window.onload = initGame;