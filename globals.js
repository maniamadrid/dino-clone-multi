import spriteUrl from './100-offline-sprite.png';

export const keys = {
    // Player 1 Keys
    KeyW: false,
    KeyS: false,
    // Player 2 Keys
    ArrowUp: false,
    ArrowDown: false
};

export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

export const GROUND_Y = 170;
export const GRAVITY = 0.6;

export const spriteSheet = new Image();
spriteSheet.src = spriteUrl;
