import { ctx, spriteSheet, canvas, GROUND_Y } from './globals.js';

export class Bird {
    constructor(speed) {
        this.x = canvas.width;
        this.speed = speed;
        this.w = 46;
        this.h = 40;

        // 1. Random Height: Low (must jump), Middle (must duck), or High (stays safe)
        const heights = [GROUND_Y + 10, GROUND_Y - 15, GROUND_Y - 50];
        this.y = heights[Math.floor(Math.random() * heights.length)];

        // 2. Animation properties
        this.timer = 0;
        this.frame = 0;
    }

    update() {
        this.x -= this.speed;

        // 3. Flap wings every 15 frames
        this.timer++;
        if (this.timer % 15 === 0) {
            this.frame = this.frame === 0 ? 1 : 0;
        }
    }

    draw() {
        // 4. Source X: 134 (frame 1) or 180 (frame 2)
        const sourceX = this.frame === 0 ? 134 : 180;

        ctx.drawImage(
            spriteSheet,
            sourceX, 2, 46, 40,
            this.x, this.y,
            this.w, this.h
        );
    }
}