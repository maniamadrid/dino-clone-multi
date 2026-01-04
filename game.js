import { Dino } from './dino.js';
import { Obstacle } from './obstacle.js';
import { Bird } from './bird.js';
import { keys, canvas, ctx, spriteSheet } from './globals.js';

// The Listeners
window.addEventListener('keydown', (event) => {
    const menu = document.getElementById('menu');
    const isMenuVisible = !menu.classList.contains('hidden');

    // 1. Handle Space for Restart
    if (event.code === 'Space' && (isGameOver || isMenuVisible)) {
        if (!p1) {
            startGame(isTwoPlayerMode ? 2 : 1);
        } else if (isGameOver) {
            resetGame();
            menu.classList.add('hidden');
        }
        event.preventDefault();
        return;
    }

    // 2. Handle Game Controls (Jump/Duck)
    if (event.code in keys) {
        keys[event.code] = true;
        event.preventDefault();
    }
});

window.addEventListener('keyup', (event) => {
    if (event.code in keys) {
        keys[event.code] = false;
    }
});

// Game State
let obstacles = [];
let spawnTimer = 0;
let gameSpeed = 7.5;
let isGameOver = false;
let isTwoPlayerMode = false;
let highScore = Number(localStorage.getItem('dinoHighScore')) || 0;

function startGame(players) {
    isTwoPlayerMode = (players === 2);
    document.getElementById('menu').classList.add('hidden');
    document.activeElement.blur();
    resetGame();
}

// Collision math
function checkCollision(dino, obs) {
    const padding = 8;
    return (
        dino.x + padding < obs.x + obs.w - padding &&
        dino.x + dino.w - padding > obs.x + padding &&
        dino.y + padding < obs.y + obs.h - padding &&
        dino.y + dino.h - padding > obs.y + padding
    );
}

// Main game loop
function loop() {
    let scoreUpdated = false;

    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawScores();

    // Update & Draw Players
    p1.update(); p1.draw();
    if (p2) {
        p2.update(); p2.draw();
    }

    // Update high score from Player 1
    if (p1.score > highScore) {
        highScore = p1.score;
        scoreUpdated = true;
    }

    // Update high score from Player 2 (if he exists)
    if (p2 && p2.score > highScore) {
        highScore = p2.score;
        scoreUpdated = true;
    }

    // Save high score if updated
    if (scoreUpdated) {
        localStorage.setItem('dinoHighScore', highScore);
    }

    // Spawn Obstacles
    spawnTimer++;
    if (spawnTimer > Math.max(60, 100 - gameSpeed)) {
        // Randomly choose: 20% chance for a Bird, 80% for a Cactus
        if (Math.random() < 0.2) {
            obstacles.push(new Bird(gameSpeed));
        } else {
            obstacles.push(new Obstacle(gameSpeed));
        }

        spawnTimer = 0;
        gameSpeed += 0.075;
    }

    // Process Obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.update();
        obs.draw();

        if (p1.alive && checkCollision(p1, obs)) p1.alive = false;
        if (p2 && p2.alive && checkCollision(p2, obs)) p2.alive = false;

        if (obs.x + obs.w < 0) obstacles.splice(i, 1);
    }

    // End Game State
    const p2Dead = !isTwoPlayerMode || (p2 && !p2.alive);
    if (!p1.alive && p2Dead) {
        isGameOver = true;

        ctx.fillStyle = "#535353";
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center"; // Center the text
        ctx.fillText("GAME OVER", canvas.width / 2, 110);
        ctx.font = "16px Arial";
        ctx.fillText("Press Space to play", canvas.width / 2, 140);

        // Show the menu again so players can restart
        document.getElementById('menu').classList.remove('hidden');
    }

    requestAnimationFrame(loop);
}

function resetGame() {
    p1 = new Dino(p1Pos, p1Filter, "KeyW", "KeyS");

    if (isTwoPlayerMode) {
        p2 = new Dino(p2Pos, p2Filter, "ArrowUp", "ArrowDown");
    } else {
        p2 = null; // No second player
    }

    obstacles = [];
    gameSpeed = 7;
    isGameOver = false;
    loop();
}

// Expose resetGame to window for HTML button
window.resetGame = resetGame;
window.startGame = startGame;

function drawScores() {
    ctx.font = "20px 'Courier New'";

    // Player 1 Score (Left)
    ctx.fillStyle = "#548d4e";
    ctx.textAlign = "left";
    ctx.fillText(`P1: ${Math.floor(p1.score)}`, 20, 30);

    // High Score (Middle) - ALWAYS VISIBLE
    ctx.fillStyle = "#535353";
    ctx.textAlign = "center";
    ctx.fillText(`HI: ${Math.floor(highScore)}`, canvas.width / 2, 30);

    // Player 2 Score (Right)
    ctx.fillStyle = "#4e668d";
    ctx.textAlign = "right";
    if (p2) {
        ctx.fillText(`P2: ${Math.floor(p2.score)}`, canvas.width - 20, 30);
    }
}

// Initialization 
const p1Filter = "sepia(100%) hue-rotate(90deg) saturate(500%)";
const p2Filter = "sepia(100%) hue-rotate(180deg) saturate(500%)";
const p1Pos = 30;
const p2Pos = 150;
let p1 = new Dino(p1Pos, p1Filter, "KeyW", "KeyS");
let p2 = null;
if (isTwoPlayerMode) {
    p2 = new Dino(p2Pos, p2Filter, "ArrowUp", "ArrowDown");
}

// Start only after images load
if (spriteSheet.complete) {
    loop();
} else {
    spriteSheet.onload = () => { loop(); };
}