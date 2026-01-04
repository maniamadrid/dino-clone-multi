import { ctx, GROUND_Y, spriteSheet, canvas } from './globals.js';

export class Obstacle {
    constructor(speed) {
        this.x = canvas.width;
        this.speed = speed;
        // 1. Randomize amount (1 to 3) and height scale (0.7 to 1.2)
        this.count = Math.floor(Math.random() * 3) + 1;
        this.heightScale = Math.random() * 0.5 + 0.7;
        // 2. Define base dimensions (matching the sprite)
        this.baseW = 25;
        this.baseH = 50;
        // 3. Calculate final dimensions
        this.w = this.baseW * this.count;
        this.h = this.baseH * this.heightScale;
        // 4. Position it on the ground (adjust Y so the bottom stays aligned)
        this.y = GROUND_Y + 5 + (this.baseH - this.h);

    }

    update() {
        this.x -= this.speed;
    }

    draw() {
        for (let i = 0; i < this.count; i++) {
            // Draw each cactus in the cluster
            ctx.drawImage(
                spriteSheet,
                332, 2, 25, 50, // Source coordinates for small cactus
                this.x + (i * this.baseW), this.y,
                this.baseW, this.h
            );
        }
    }
}