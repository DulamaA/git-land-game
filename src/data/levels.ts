import type { Level } from '../types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Initiera projektet',
    tasks: ['Initiera repo: `git init`', 'Lägg till remote origin: `git remote add origin <url>`'],
  },
  {
    id: 2,
    title: 'Första commit',
    tasks: [
      'Stage:a alla filer: `git add .`',
      'Gör en initial commit: `git commit -m "chore: initial commit"`',
    ],
  },
  {
    id: 3,
    title: 'Synka main mot remote',
    tasks: [
      'Byt/skapa main: `git checkout -B main`',
      'Hämta remote: `git fetch origin`',
      'Uppdatera main: `git pull --ff-only origin main`',
    ],
  },
  {
    id: 4,
    title: 'Skapa feature-branch',
    tasks: ['Skapa ny branch: `git checkout -b feature/test`'],
  },
  {
    id: 5,
    title: 'Jobba & committa på branchen',
    tasks: [
      'Stage:a alla filer: `git add .`',
      'Commit:a ändring: `git commit -m "feat: add button"`',
    ],
  },
  {
    id: 6,
    title: 'Push första gången',
    tasks: ['Push:a branchen: `git push -u origin feature/test`'],
  },
  {
    id: 7,
    title: 'Öppna Pull Request',
    tasks: [
      'Skapa PR med GitHub: `gh pr create --base main --head feature/test --title "feat: test" --body "Add button"`',
    ],
  },
  {
    id: 8,
    title: 'Review-loop',
    tasks: [
      'Gör fler ändringar (stage): `git add .`',
      'Commit:a fix: `git commit -m "fix: review changes"`',
      'Push:a uppdateringen: `git push`',
    ],
  },
  {
    id: 9,
    title: 'Håll branchen uppdaterad',
    tasks: [
      'Hämta senaste: `git fetch origin`',
      'Uppdatera med main (välj en): `git merge origin/main` eller `git rebase origin/main`',
      'Push:a efter uppdatering: `git push` (eller `git push --force-with-lease` vid rebase)',
    ],
  },
  {
    id: 10,
    title: 'Lös merge/rebase-konflikter',
    tasks: [
      'Stage:a lösta filer: `git add <fil(er)>`',
      'Färdigställ: `git commit` (merge) eller `git rebase --continue` (rebase)',
      'Push:a: `git push`',
    ],
  },
  {
    id: 11,
    title: 'Squash-merge PR och ta bort remote-branch',
    tasks: ['Squash-merge + delete: `gh pr merge <nr/url> --squash --delete-branch`'],
  },
  {
    id: 12,
    title: 'Synka lokal main & städa lokalt',
    tasks: [
      'Byt till main: `git checkout main`',
      'Hämta senaste main: `git pull --ff-only origin main`',
      'Ta bort lokal feature-branch: `git branch -d feature/test`',
      'Rensa bort gamla remote-branches: `git fetch -p`',
    ],
  },
  {
    id: 13,
    title: 'Multi-branch-flöde (develop → main)',
    tasks: [
      'Skapa develop: `git checkout -b develop`',
      'Push:a develop: `git push -u origin develop`',
      'Skapa PR mot develop: `gh pr create --base develop --head feature/task --title "feat: task"`',
      'Skapa release-PR till main: `gh pr create --base main --head develop --title "release: v1.0.0"`',
    ],
  },
  {
    id: 14,
    title: 'Rebase - fördjupning',
    tasks: [
      'Byt till feature: `git checkout feature/task`',
      'Hämta senaste: `git fetch origin`',
      'Interaktiv rebase mot main: `git rebase -i origin/main`',
      'Push:a säkert efter rebase: `git push --force-with-lease`',
    ],
  },
  {
    id: 15,
    title: 'Deploy/CI med GitHub Actions (intro)',
    tasks: [
      `Skapa filen \`.github/workflows/ci.yml\` med detta innehåll (Node 20, kör på push/PR till main & develop):

\`\`\`yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test --if-present
\`\`\`
`,
    ],
  },
];
