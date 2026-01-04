import { keys, ctx, GROUND_Y, GRAVITY, spriteSheet } from './globals.js';

export class Dino {
    constructor(x, colorFilter, jumpKey, duckKey) {
        this.x = x;
        this.y = GROUND_Y;
        this.w = 44;
        this.h = 47;
        this.vY = 0;
        this.colorFilter = colorFilter;
        this.jumpKey = jumpKey;
        this.duckKey = duckKey;
        this.alive = true;
        this.isGrounded = false;
        this.score = 0;
    }

    update() {
        if (!this.alive) return;

        this.score += 0.1;

        this.vY += GRAVITY;
        this.y += this.vY;

        if (this.y > GROUND_Y) {
            this.y = GROUND_Y;
            this.vY = 0;
            this.isGrounded = true;
        }

        if (keys[this.jumpKey] && this.isGrounded) {
            this.vY = -12;
            this.isGrounded = false;
        }

        if (keys[this.duckKey]) {
            this.h = 25;
            this.y = GROUND_Y + 22;
        }
        else {
            this.h = 47;
        }
    }

    draw() {
        ctx.save();
        // Visual distinction for players
        if (this.colorFilter) ctx.filter = this.colorFilter;
        if (!this.alive) ctx.filter = "grayscale(100%) opacity(50%)";

        // drawImage parameters: (image, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH)
        // 848, 2 is the "standing dino" in the sprite sheet
        ctx.drawImage(spriteSheet, 848, 2, 44, 47, this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}