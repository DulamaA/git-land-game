# 🧭 Git-Land

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Git-Land** is an interactive educational game that teaches Git step by step.  
Each level contains a sequence of Git-related tasks and commands.  
Players learn Git in a playful, hands-on way.

---

## 🌍 Project Overview

This project is built with **React + TypeScript**, styled using **Tailwind CSS**, and bundled with **Vite**.  
Game progress is stored in **localStorage** so users can continue later.

Main goals:
- Learn Git through interactive levels  
- Practice commands safely in a simulated terminal  
- Unlock new levels as you complete previous ones  
- Visual progress tracking and success feedback  

---

## 🧩 Tech Stack

| Purpose | Tool |
|----------|------|
| Framework | [React](https://react.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite](https://vitejs.dev/) |
| State persistence | `localStorage` |

---

## 🧱 Adding a New Level

To add a new level open the file : src/data/levels.ts.
Add a new level object in the **LEVELS** array:

```json
{
  id: 13,
  title: 'Your New Level Title',
  steps: [
    {
      text: 'Run git init to create a new repository.',
      expects: ['git init'],
      hints: ['Try typing git init'],
    },
    {
      text: 'Add all files to staging.',
      expects: ['git add .'],
      hints: [],
    },
  ]
}
```

Save the file and restart the dev server (npm run dev).

---

## 💾 How Progress Is Saved

Player progress (completed levels, current level, etc.) is saved in the browser using **localStorage**. This logic is handled in: src/state/progress.ts. 
 - The custom React hook useProgress() reads and updates this data.
 - On page reload, it automatically restores your progress.
 - The reset() function clears all saved progress.

 Example: localStorage.setItem('gitland_progress', JSON.stringify(state));

---

## 🕹️ Gameplay Flow 

1. The user visits LevelsHub (/levels) and selects a level.

2. On LevelScreen, they see the instructions and can start the game.

3. Inside GameScreen, the terminal simulation accepts Git commands.

4. Once all steps are completed, the next level unlocks.

5. After finishing all levels, the FinishGame screen with confetti appears. 🎉

---

## Screenshots (coming)

HomeScreen
GameScreen
FinishGame
Levels list
Level details

---
## 🚀 Development

Run locally:

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## 🤝 Contributing

Pull requests are welcome! If you want to add levels, fix bugs, or improve UI — fork the repo and open a PR. Before committing, make sure ESLint and Prettier run without issues.

---

## 💖 Credits

Built with ❤️ by Antonina Dulama
Made for learning Git in a fun, interactive way.
