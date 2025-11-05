import type { Level } from '../types';

export const LEVELS: Level[] = [
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
    title: 'Squash-merge PR och ta bort remote-branch',
    steps: [
      {
        text: 'Squash-merga din PR och ta bort fjärr-branchen.',
        expects: ['gh pr merge <nr/url> --squash --delete-branch', 'gh pr merge --squash --delete-branch'],
        hints: [
          'Kräver GitHub CLI (gh).',
          'Squash skapar en enda commit.',
          'Flaggan --delete-branch rensar remote-grenen.',
        ],
      },
    ],
  },

  {
    id: 11,
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
        text: 'Ta bort din lokala feature-branch.', expects: ['git branch -d <branch>'],
        hints: [
          'Rensar lokalt efter merge.',
          'Var säker på att den är mergad.',
          'Ex: git branch -d feature/header',
        ],
      },
      {
        text: 'Rensa bort gamla fjärr-branscher.', expects: ['git fetch -p', 'git fetch --prune'],
        hints: [
          'Tar bort remote-refs som rensats.',
          'Bra rutin efter merges.',
          'Ex: git fetch --prune',
        ],
      },
    ],
  },

  {
    id: 12,
    title: 'Multi-branch-flöde (develop → main)',
    steps: [
      {
        text: 'Skapa develop och byt till den.',
        expects: ['git checkout -b develop', 'git switch -c develop'],
        hints: [
          'Separera utveckling från main.',
          'Skapa + byt i samma kommando.',
          'Ex: git switch -c develop',
        ],
      },
      {
        text: 'Pusha develop och spåra den.', expects: ['git push -u origin develop'],
        hints: [
          'Första pushen sätter upstream.',
          'Remote är origin.',
          'Ex: git push -u origin develop',
        ],
      },
      {
        text: 'Öppna PR mot develop från din feature-branch.',
        expects: ['gh pr create --base develop --head <branch>', 'gh pr create'],
        hints: [
          'Kräver GitHub CLI (gh).',
          'Bas: develop, head: din gren.',
          'Alternativ: gör PR i GitHub UI.',
        ],
      },
      {
        text: 'Öppna release-PR från develop till main.',
        expects: ['gh pr create --base main --head develop', 'gh pr create'],
        hints: [
          'Release-flöde via PR.',
          'Base = main, head = develop.',
          'Alternativ: skapa i UI.',
        ],
      },
    ],
  },

  {
    id: 13,
    title: 'Rebase - fördjupning',
    steps: [
      {
        text: 'Byt till din feature-branch.',
        expects: ['git checkout <branch>', 'git switch <branch>'],
        hints: [
          'Se till att rätt gren är aktiv.',
          'Ange namnet på din gren.',
          'Ex: git switch feature/header',
        ],
      },
      {
        text: 'Hämta senaste från origin.', expects: ['git fetch', 'git fetch origin'],
        hints: [
          'Uppdatera referenser innan rebase.',
          'origin är standard-remote.',
          'Ex: git fetch origin',
        ],
      },
      {
        text: 'Interaktiv rebase mot main (t.ex. 3 senaste).',
        expects: ['git rebase -i origin/main', 'git rebase -i HEAD~3'],
        hints: [
          'Välj omordna/squasha i editorn.',
          'Mot main eller HEAD~N.',
          'Ex: git rebase -i origin/main',
        ],
      },
      {
        text: 'Pusha säkert efter rebase.', expects: ['git push --force-with-lease', 'git push'],
        hints: [
          'Force-push behövs ofta efter rebase.',
          'Använd --force-with-lease.',
          'Ex: git push --force-with-lease',
        ],
      },
    ],
  },

  {
    id: 14,
    title: 'Deploy/CI med GitHub Actions (intro)',
    steps: [
      {
        text: 'Lägg till en CI-workflow för Node 20 som körs vid push och PR till main & develop.',
        expects: [],
        hints: [
          'Skapa .github/workflows/ci.yml.',
          'actions/setup-node@v4 och npm scripts.',
          'Trigga på push och pull_request.',
        ],
      },
      {
        text: 'Staga workflow-filen.', expects: ['git add .github/workflows/ci.yml', 'git add .'],
        hints: [
          'Stagea YAML-filen.',
          'Punkt (.) tar hela mappen.',
          'Ex: git add .github/workflows/ci.yml',
        ],
      },
      {
        text: 'Commit:a ändringen.', expects: ['git commit -m <message>'],
        hints: [
          'Beskriv vad workflow gör.',
          'Använd -m "…".',
          'Ex: git commit -m "ci: add Node 20 workflow"',
        ],
      },
      {
        text: 'Pusha upp förändringen (till main eller din branch).',
        expects: ['git push', 'git push origin main', 'git push -u origin <branch>'],
        hints: [
          'Pusha till rätt gren.',
          'Första push: använd -u.',
          'Ex: git push',
        ],
      },
      {
        text: 'Verifiera i GitHub → Actions att jobben körs (build & test).',
        expects: [],
        hints: [
          'Öppna fliken “Actions”.',
          'Kika på senaste run.',
          'Se att jobben är gröna.',
        ],
      },
    ],
  },
];
