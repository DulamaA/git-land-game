import type { Level } from '../types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Initiera projektet',
    steps: [
      { text: 'Initiera ett tomt Git-repo i den här mappen.', expects: ['git init'] },
      {
        text: 'Koppla en fjärr som heter "origin" till en URL.',
        expects: ['git remote add origin https://github.com/my-user/testrepo'],
      },
    ],
  },

  {
    id: 2,
    title: 'Första commit',
    steps: [
      { text: 'Staga alla filer för commit.', expects: ['git add .', 'git add -A'] },
      { text: 'Gör en initial commit med ett meddelande.', expects: ['git commit -m <message>'] },
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
      },
      { text: 'Hämta senaste från remote.', expects: ['git fetch', 'git fetch origin'] },
      {
        text: 'Uppdatera main snabbt utan merge-commit.',
        expects: ['git pull --ff-only', 'git pull --ff-only origin main'],
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
      },
    ],
  },

  {
    id: 5,
    title: 'Jobba & committa på branchen',
    steps: [
      { text: 'Staga alla ändringar.', expects: ['git add .', 'git add -A'] },
      {
        text: 'Commit:a ändringen med ett tydligt meddelande.',
        expects: ['git commit -m <message>'],
      },
    ],
  },

  {
    id: 6,
    title: 'Push första gången',
    steps: [{ text: 'Pusha din branch och sätt upstream.', expects: ['git push -u origin <branch>'] }],
  },

  {
    id: 7,
    title: 'Öppna Pull Request',
    steps: [
      {
        text: 'Öppna en Pull Request från din branch mot main.',
        expects: [
          'gh pr create --base main --head <branch> --title <message> --body <message>',
          'gh pr create --base main --head <branch>',
          'gh pr create',
        ],
      },
    ],
  },

  {
    id: 8,
    title: 'Review-loop',
    steps: [
      {
        text: 'Gör fler ändringar och staga dem.',
        expects: ['git add .', 'git add -A', 'git add <file>'],
      },
      { text: 'Commit:a din fix.', expects: ['git commit -m <message>'] },
      { text: 'Pusha uppdateringen till samma PR.', expects: ['git push'] },
    ],
  },

  {
    id: 9,
    title: 'Håll branchen uppdaterad',
    steps: [
      { text: 'Hämta senaste från origin.', expects: ['git fetch', 'git fetch origin'] },
      {
        text: 'Uppdatera din branch med main (välj strategi).',
        expects: ['git merge origin/main', 'git rebase origin/main'],
      },
      {
        text: 'Pusha efter uppdatering (säkert vid rebase).',
        expects: ['git push', 'git push --force-with-lease'],
      },
    ],
  },

  {
    id: 10,
    title: 'Lös merge/rebase-konflikter',
    steps: [
      {
        text: 'Staga de filer du löst.',
        expects: ['git add <file>', 'git add <file(s)>', 'git add .'],
      },
      { text: 'Färdigställ konflikten.', expects: ['git commit', 'git rebase --continue'] },
      { text: 'Pusha när allt är grönt.', expects: ['git push'] },
    ],
  },

  {
    id: 11,
    title: 'Squash-merge PR och ta bort remote-branch',
    steps: [
      {
        text: 'Squash-merga din PR och ta bort fjärr-branchen.',
        expects: ['gh pr merge <nr/url> --squash --delete-branch', 'gh pr merge --squash --delete-branch'],
      },
    ],
  },

  {
    id: 12,
    title: 'Synka lokal main & städa lokalt',
    steps: [
      { text: 'Byt till main.', expects: ['git checkout main', 'git switch main'] },
      {
        text: 'Hämta senaste main snabbt.',
        expects: ['git pull --ff-only', 'git pull --ff-only origin main'],
      },
      { text: 'Ta bort din lokala feature-branch.', expects: ['git branch -d <branch>'] },
      { text: 'Rensa bort gamla fjärr-branscher.', expects: ['git fetch -p', 'git fetch --prune'] },
    ],
  },

  {
    id: 13,
    title: 'Multi-branch-flöde (develop → main)',
    steps: [
      {
        text: 'Skapa develop och byt till den.',
        expects: ['git checkout -b develop', 'git switch -c develop'],
      },
      { text: 'Pusha develop och spåra den.', expects: ['git push -u origin develop'] },
      {
        text: 'Öppna PR mot develop från din feature-branch.',
        expects: ['gh pr create --base develop --head <branch>', 'gh pr create'],
      },
      {
        text: 'Öppna release-PR från develop till main.',
        expects: ['gh pr create --base main --head develop', 'gh pr create'],
      },
    ],
  },

  {
    id: 14,
    title: 'Rebase - fördjupning',
    steps: [
      {
        text: 'Byt till din feature-branch.',
        expects: ['git checkout <branch>', 'git switch <branch>'],
      },
      { text: 'Hämta senaste från origin.', expects: ['git fetch', 'git fetch origin'] },
      {
        text: 'Interaktiv rebase mot main (t.ex. 3 senaste).',
        expects: ['git rebase -i origin/main', 'git rebase -i HEAD~3'],
      },
      { text: 'Pusha säkert efter rebase.', expects: ['git push --force-with-lease', 'git push'] },
    ],
  },

  {
    id: 15,
    title: 'Deploy/CI med GitHub Actions (intro)',
    steps: [
      {
        text: 'Lägg till en CI-workflow för Node 20 som körs vid push och PR till main & develop.',
        expects: [],
      },
      { text: 'Staga workflow-filen.', expects: ['git add .github/workflows/ci.yml', 'git add .'] },
      { text: 'Commit:a ändringen.', expects: ['git commit -m <message>'] },
      {
        text: 'Pusha upp förändringen (till main eller din branch).',
        expects: ['git push', 'git push origin main', 'git push -u origin <branch>'],
      },
      {
        text: 'Verifiera i GitHub → Actions att jobben körs (build & test).',
        expects: [],
      },
    ],
  },
];
