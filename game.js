const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const rowSelector = document.getElementById("rowSelector");
canvas.width = 128;
canvas.height = 128;

// Load the LPC sprite sheet
const spriteSheet = new Image();
spriteSheet.src = "sprites/test.png"; // Replace with the correct path

// Sprite details for LPC
const SPRITE_WIDTH = 64;
const SPRITE_HEIGHT = 64;
let frameIndex = 0;
let tickCount = 0;
const TICKS_PER_FRAME = 6; // Control animation speed
let currentRow = 0;

// Row-wise frame count mapping
const frameMap = [
    7, 7, 7,  // Rows 1-3
    8, 8, 8, 8, // Rows 4-7
    11, 11, 11, 11, // Rows 8-11
    12, 12, 12, 12, // Rows 12-15
    13, 13, 13, 13 // Rows 16-19
];

rowSelector.addEventListener("change", (event) => {
    currentRow = parseInt(event.target.value, 10);
    frameIndex = 0;
});

function updateAnimation() {
    tickCount++;
    if (tickCount > TICKS_PER_FRAME) {
        tickCount = 0;
        frameIndex = (frameIndex + 1) % frameMap[currentRow];
    }
}

function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        spriteSheet,
        frameIndex * SPRITE_WIDTH,
        currentRow * SPRITE_HEIGHT,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        32,
        32,
        SPRITE_WIDTH,
        SPRITE_HEIGHT
    );
}

function gameLoop() {
    updateAnimation();
    drawFrame();
    requestAnimationFrame(gameLoop);
}

spriteSheet.onload = function () {
    gameLoop();
};
