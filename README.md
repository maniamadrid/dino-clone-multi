# Chrome Dino Multiplayer

Dino Multiplayer is another clone of game Chrome Dino (chrome://dino) with realtime multiplayer.

## Features

- Web-based: Playable directly in any modern web browser.

- Platform: Available on PC only (keyboard required); mobile devices are not supported at this time.

- Local Multiplayer: Supports up to 2 players playing simultaneously on one PC.

- Global Leaderboard: Tracks high scores locally using localStorage.

- Competitive Gameplay: Two players compete in real-time to see who survives the longest.

## Demo link

http://maniamdrid.github.io/dino-clone-multi.

## To-do's

- Networking: Add WebRTC support to allow two players to compete from different devices.

- Global Leaderboard: Implement a global High Score system for all network users.

## Prerequisites

- **Node.js**: Version `20.x` is required.
- **NPM**: Standard package manager included with Node.js.

## Getting Started

To run the project locally, follow these steps:

1. **Check Node.js Version**
   Ensure you are using version 20:
   ```bash
   node -v
   # If you use nvm, run: nvm use 20
2. **Install Dependencies**
   Navigate to the project directory and install the required packages:
   ```bash
   npm install
   ```
3. **Run the Application**
   Start the server using the following command:
   ```bash
   npm run dev
   ```
