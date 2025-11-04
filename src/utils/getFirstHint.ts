export function getFirstHint(taskText: string, misses = 0, expects?: string[]): string | null {
  const t = (taskText || '').toLowerCase();
  const firstExpected = (expects?.[0] || '').toLowerCase();

  const expectedContext =
    /^git\s+init\b/.test(firstExpected) ? 'init' :
      /^git\s+remote\b/.test(firstExpected) ? 'remote' :
        /^git\s+add\b/.test(firstExpected) ? 'add' :
          /^git\s+commit\b/.test(firstExpected) ? 'commit' :
            /^git\s+push\b/.test(firstExpected) ? 'push' :
              /^git\s+pull\b/.test(firstExpected) ? 'pull' :
                /^git\s+(checkout|switch)\b/.test(firstExpected) ? 'checkout' :
                  /^git\s+branch\b/.test(firstExpected) ? 'branch' :
                    /^git\s+merge\b/.test(firstExpected) ? 'merge' :
                      /^git\s+rebase\b/.test(firstExpected) ? 'rebase' :
                        /^gh\s+pr\b/.test(firstExpected) ? 'pr' :
                          '';

  const textContext =
    t.includes('init') ? 'init' :
      t.includes('remote') ? 'remote' :
        t.includes('commit') ? 'commit' :
          t.includes('push') ? 'push' :
            t.includes('pull') ? 'pull' :
              t.includes('branch') ? 'branch' :
                t.includes('merge') ? 'merge' :
                  t.includes('rebase') ? 'rebase' :
                    t.includes('checkout') || t.includes('switch') ? 'checkout' :
                      t.includes('action') || t.includes('workflow') ? 'workflow' :
                        'general';

  const context = expectedContext || textContext;

  const baseHints: Record<string, string[]> = {
    general: [
      'Läs uppgiften noga.',
      'Fundera vilket Git-kommando som passar här.',
      'Titta på vad som ska hända: skapa, spara, pusha, slå ihop…',
    ],
    init: [
      'Det handlar om att starta ett nytt Git-repo i projektet.',
      'Kommandot börjar med "git i...".',
      'Det är det allra första du gör i ett nytt repo.',
    ],
    remote: [
      'Koppla ditt lokala repo till en fjärr.',
      'Du anger ett namn (ofta "origin") och en URL.',
      'Tänk: `git remote add origin <url>`.',
    ],
    add: [
      'Stagea filer inför commit.',
      'Tänk `git add .` eller en specifik fil.',
      'Detta förbereder ändringar för commit.',
    ],
    commit: ['Spara dina staged ändringar.', 'Använd `-m` för meddelandet.', 'Tänk: `git commit -m "Meddelande"`.'],
    push: [
      'Skicka commits till fjärran (GitHub).',
      'Ofta `git push` eller `git push -u origin <branch>`.',
      'Se till att remote och branch finns.',
    ],
    pull: [
      'Hämta och uppdatera lokalt från fjärran.',
      'Här vill du undvika merge-commit.',
      'Hint: använd `--ff-only` för snabb uppdatering.',
    ],
    branch: [
      'Jobba med grenar (skapa/lista/ta bort).',
      'Tänk `git branch <namn>` eller `-d` för att radera.',
      'Listning utan argument, t.ex. `git branch`.',
    ],
    checkout: [
      'Byt till en annan branch (eller skapa + byt).',
      'Tänk `git switch <branch>` eller `git checkout -b <ny>`.',
      'Säkerställ att rätt branch blir aktiv.',
    ],
    merge: ['Slå ihop två grenar.', 'Se till att stå på rätt mål-branch.', 'Tänk `git merge <gren>`.'],
    rebase: [
      'Flytta commits ovanpå en ny bas.',
      'Var försiktig - rebase omskriver historik.',
      'T.ex. `git rebase origin/main` eller interaktiv rebase.',
    ],
    pr: [
      'Skapa eller merg:a en pull request.',
      'T.ex. `gh pr create` eller `gh pr merge`.',
      'Följ prompten om beskrivning/titel behövs.',
    ],
    workflow: [
      'Här handlar det om en CI-fil under .github/workflows/.',
      'YAML med actions: checkout/setup-node osv.',
      'Ingen kod - bara rätt struktur.',
    ],
  };

  if (context === 'pull' && /--ff-only/.test(firstExpected)) {
    baseHints.pull = [
      'Uppdatera från fjärran utan merge-commit.',
      'Du vill ha en fast-forward.',
      'Använd flaggan `--ff-only` tillsammans med `git pull`.',
    ];
  }

  const hints = baseHints[context] ?? baseHints.general;
  const idx = Math.min(misses, hints.length - 1);

  return hints[idx];
}
