import type { TLevel } from '../types';

export const LEVELS: TLevel[] = [
  {
    id: 1,
    title: 'Initiera projektet',
    steps: [
      {
        text: 'Initiera ett tomt Git-repo i den här mappen.',
        expects: ['git init'],
        hints: [
          'Skapar ett nytt repo i aktuell mapp.',
          'Kör kommandot i rotmappen.',
          'Skriv: git init',
        ],
      },
      {
        text: 'Koppla en fjärr som heter "origin" till URL: https://github.com/my-user/testrepo',
        expects: ['git remote add origin https://github.com/my-user/testrepo'],
        hints: [
          'Kopplar lokalt repo till GitHub.',
          'Mönster: git remote add <namn> <url>',
          'Ex: git remote add origin https://github.com/my-user/testrepo',
        ],
      },
    ],
  },

  {
    id: 2,
    title: 'Första commit',
    steps: [
      {
        text: 'Lägg till filerna i commiten (stage).',
        expects: ['git add .', 'git add -A', 'git add <file>'],
        hints: [
          'Stagea ändringar inför commit (t.ex. med “.”).',
          'Exempel: git add .',
        ],
      },
      {
        text: 'Skriv ett tydligt commit-meddelande.',
        expects: ['git commit -m <message>'],
        hints: [
          'Använd flaggan -m "…".',
          'Kort, beskrivande meddelande.',
          'Ex: git commit -m "feat: add header"',
        ],
      },
    ],
  },

  {
    id: 3,
    title: 'Synka main mot remote',
    steps: [
      {
        text: 'Byt till (eller skapa) main som aktiv branch.',
        expects: [
          'git checkout -B main',
          'git checkout -b main',
          'git switch -C main',
          'git switch -c main',
          'git checkout main',
          'git switch main',
        ],
        hints: [
          'Se till att stå på “main”.',
          'Skapa och byt med -b/-c vid behov.',
          'Ex: git switch -c main',
        ],
      },
      {
        text: 'Hämta senaste från remote.',
        expects: ['git fetch', 'git fetch origin'],
        hints: [
          'Hämtar referenser utan att merge:a.',
          'Kan ange remote: origin.',
          'Ex: git fetch origin',
        ],
      },
      {
        text: 'Uppdatera main snabbt utan merge-commit.',
        expects: ['git pull --ff-only', 'git pull --ff-only origin main'],
        hints: [
          'Fast-forward endast (inga extra commits).',
          'Kan ange remote och branch.',
          'Ex: git pull --ff-only',
        ],
      },
    ],
  },

  {
    id: 4,
    title: 'Skapa feature-branch',
    steps: [
      {
        text: 'Skapa och byt till en ny feature-branch.',
        expects: ['git checkout -b <branch>', 'git switch -c <branch>'],
        hints: [
          'Skapa och byt i samma kommando.',
          'Välj beskrivande namn, t.ex. feature/header.',
          'Ex: git switch -c feature/header',
        ],
      },
    ],
  },

  {
    id: 5,
    title: 'Skriv tydligt commit-meddelande',
    steps: [
      {
        text:
        'Du har lagt till en header i HTML-filen. ' +
        'Skriv ett **tydligt** commit-meddelande enligt Conventional Commits ' +
        '(t.ex. `feat: add header`).\n\n' +
        'Läs mer: https://www.conventionalcommits.org/en/v1.0.0/#summary',
        expects: ['git commit -m <message>'],
        hints: [
          'Börja med en typ: t.ex. feat, fix, docs, chore.',
          'Exempel: feat: add header',
          'Kommandot: git commit -m "feat: add header"',
        ],
      },
    ],
  },

  {
    id: 6,
    title: 'Add → Commit → Push (första gången)',
    steps: [
      {
        text: '1) Lägg till filerna i commiten (stage).',
        expects: ['git add .', 'git add -A', 'git add <file>'],
        hints: [
          'Stagea ändringar inför commit.',
          'Exempel: git add .',
        ],
      },
      {
        text: '2) Skriv ett tydligt commit-meddelande.',
        expects: ['git commit -m <message>'],
        hints: [
          'Använd -m "…".',
          'Håll det kort och beskrivande.',
          'Ex: git commit -m "feat: add header"',
        ],
      },
      {
        text: '3) Pusha din branch main till remote origin.',
        expects: ['git push -u origin <branch>'],
        hints: [
          'Första pushen: lägg till -u.',
          'Exempel: git push -u origin main',
          'Senare räcker: git push',
        ],
      },
    ],
  },


  {
    id: 7,
    title: 'Review-loop',
    steps: [
      {
        text: 'Du har gjort fler ändringar. Stage:a dina ändringar.',
        expects: ['git add .', 'git add -A', 'git add <file>'],
        hints: [
          'Stagea de filer du ändrat.',
          'Punkt (.) tar allt.',
          'Ex: git add .',
        ],
      },
      {
        text: 'Commit:a din fix.',
        expects: ['git commit -m <message>'],
        hints: [
          'Beskriv vad du fixade.',
          'Använd -m "…".',
          'Ex: git commit -m "fix: handle null id"',
        ],
      },
      {
        text: 'Pusha uppdateringen till samma PR.',
        expects: ['git push'],
        hints: [
          'Nu har upstream redan satts.',
          'Vanligt push räcker.',
          'Ex: git push',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Håll branchen uppdaterad',
    steps: [
      {
        text: 'Hämta senaste från origin.', expects: ['git fetch', 'git fetch origin'],
        hints: [
          'Uppdaterar refs lokalt.',
          'Bra före merge/rebase.',
          'Ex: git fetch origin',
        ],
      },
      {
        text: 'Uppdatera din branch med main (välj strategi).',
        expects: ['git merge origin/main', 'git rebase origin/main'],
        hints: [
          'Merge: bevarar historiken.',
          'Rebase: spolar om ovanpå main.',
          'Välj en av strategierna.',
        ],
      },
      {
        text: 'Pusha efter uppdatering (säkert vid rebase).',
        expects: ['git push', 'git push --force-with-lease'],
        hints: [
          'Efter rebase krävs ofta force-push.',
          'Använd alltid --force-with-lease.',
          'Annars räcker vanlig push.',
        ],
      },
    ],
  },

  {
    id: 9,
    title: 'Lös merge/rebase-konflikter',
    steps: [
      {
        text: 'Du har löst konflikten i **index.html**, stage:a den.',
        expects: ['git add index.html'],
        hints: [
          'Stage:a just den fil du har löst.',
          'Ange filnamnet (inte punkt).',
          'Ex: git add index.html',
        ],
      },
      {
        text: 'Färdigställ konflikten.', expects: ['git commit', 'git rebase --continue'],
        hints: [
          'Vid merge: commit avslutar.',
          'Vid rebase: kör --continue.',
          'Välj enligt din strategi.',
        ],
      },
      {
        text: 'Pusha när allt är grönt.', expects: ['git push'],
        hints: [
          'Skicka upp din lösta version.',
          'Upstream ska redan vara satt.',
          'Ex: git push',
        ],
      },
    ],
  },

  {
    id: 10,
    title: 'Synka lokal main & städa lokalt',
    steps: [
      {
        text: 'Byt till main.', expects: ['git checkout main', 'git switch main'],
        hints: [
          'Se till att main är aktiv.',
          'Använd checkout eller switch.',
          'Ex: git switch main',
        ],
      },
      {
        text: 'Hämta senaste main snabbt.',
        expects: ['git pull --ff-only', 'git pull --ff-only origin main'],
        hints: [
          'Fast-forward uppdatering.',
          'Undvik merge-commit.',
          'Ex: git pull --ff-only',
        ],
      },
      {
        text: 'Ta bort din lokala feature-branch som heter "feature/header".',
        expects: [
          'git branch -d feature/header',
          'git branch -D feature/header',
        ],
        hints: [
          'Rensar lokalt efter merge.',
          'Om den inte är mergad ännu: använd -D (force).',
          'Ex: git branch -d feature/header',
        ],
      },
      {
        text: 'Rensa bort gamla fjärr-branscher.', expects: [
          'git fetch -p',
          'git fetch --prune',
          'git remote prune origin',
        ],
        hints: [
          'Tar bort remote-refs som rensats.',
          'Bra rutin efter merges.',
          'Ex: git fetch --prune',
        ],
      },
    ],
  },
  {
    id: 11,
    title: 'Publicera med GitHub Pages (intro)',
    steps: [
      {
        text:
          'Öppna ditt repo på GitHub → **Settings** → **Pages**. ' +
          'Välj **Source: Deploy from a branch**, **Branch: main**, **Folder: /(root)** och klicka **Save**.',
        expects: [],
        hints: [
          'Hitta Pages under repo-inställningarna.',
          'Sätt “Deploy from a branch”, branch = main, folder = /(root).',
          'Glöm inte att spara.',
        ],
      },
      {
        text:
          'Vänta 1-2 minuter tills sidan har byggts. ' +
          'När du är redo: skriv **ok** i rutan här nedanför och tryck **Enter**. ' +
          'Besök sedan URL:en som visas under “Your site is live at…”.',
        expects: ['ok', 'OK'],
        hints: [
          'Bygget kan ta någon minut.',
          'Skriv “ok” (små eller stora bokstäver) och tryck Enter för att markera steget som klart.',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Deploy/CI med GitHub Actions (intro)',
    steps: [
      {
        text:
          'Skapa filen **`.github/workflows/deploy.yml`** och klistra in exempelkoden nedan. ' +
          'Workflowen bygger din app (Node 20) och deployar till **GitHub Pages** när du pushar till `main`.',
        expects: [], // player press "kör" to mark done
        hints: [
          'Filen ska heta deploy.yml och ligga under .github/workflows/.',
          'Node 20 + Pages funkar för många SPA-sidor.',
          'Byt "dist" om din build-mapp heter något annat.',
        ],
        snippetBelowInput: String.raw`name: Deploy to GitHub Pages
  on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v4
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4`,
      },
      {
        text: 'Stage:a workflow-filen.',
        expects: ['git add .github/workflows/deploy.yml', 'git add .'],
        hints: [
          'Stagea YAML-filen.',
          'Punkt (.) tar hela mappen.',
          'Ex: git add .github/workflows/deploy.yml',
        ],
      },
      {
        text: 'Commit:a ändringen.',
        expects: ['git commit -m <message>'],
        hints: [
          'Beskriv vad workflow gör.',
          'Använd -m "…".',
          'Ex: git commit -m "ci: add deploy workflow"',
        ],
      },
      {
        text: 'Pusha upp förändringen (till main eller din branch).',
        expects: ['git push', 'git push origin main', 'git push -u origin <branch>'],
        hints: ['Pusha till rätt gren.', 'Första push: använd -u.', 'Ex: git push'],
      },
      {
        text: 'Verifiera i GitHub → Actions att jobben körs (build & deploy).',
        expects: [],
        hints: ['Öppna fliken “Actions”.', 'Kika på senaste run.', 'Se att build & deploy är gröna.'],
      },
    ],
  },
];