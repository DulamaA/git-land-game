export function getFirstHint(taskText: string, misses = 0): string | null {
  const t = taskText.toLowerCase();

  let context = '';
  if (t.includes('init')) {
    context = 'init';
  } else if (t.includes('remote')) {
    context = 'remote';
  } else if (t.includes('commit')) {
    context = 'commit';
  } else if (t.includes('push')) {
    context = 'push';
  } else if (t.includes('pull')) {
    context = 'pull';
  } else if (t.includes('branch')) {
    context = 'branch';
  } else if (t.includes('merge')) {
    context = 'merge';
  } else if (t.includes('rebase')) {
    context = 'rebase';
  } else if (t.includes('checkout') || t.includes('switch')) {
    context = 'checkout';
  } else if (t.includes('action') || t.includes('workflow')) {
    context = 'workflow';
  } else {
    context = 'general';
  }

  const baseHints: Record<string, string[]> = {
    init: [
      'Det handlar om att starta ett nytt Git-repo i projektet.',
      'Kommandot börjar med "git i..."',
      'Det är det allra första du gör i ett nytt repo.',
    ],
    remote: [
      'Här ska du koppla ihop ditt lokala repo med ett fjärrrepo.',
      'Kommandot lägger till en fjärr och innehåller ett namn, ofta "origin".',
      'Det används ofta tillsammans med en URL.',
    ],
    commit: [
      'Du ska spara dina staged ändringar.',
      'Kommandot börjar med "git c..." och behöver ett meddelande.',
      'Du har kanske sett flaggan -m för att skriva meddelanden.',
    ],
    push: [
      'Dags att skicka upp commits till GitHub.',
      'Kommandot börjar med "git p..."',
      'Det kan även innehålla namnet på fjärran, t.ex. origin.',
    ],
    pull: [
      'Du ska hämta och uppdatera koden från fjärran.',
      'Kommandot kombinerar fetch och merge.',
      'Kommandot börjar med "git pu..." men är inte push!',
    ],
    branch: [
      'Du ska skapa eller byta gren.',
      'Kommandot börjar med "git c..." men handlar om brancher.',
      'Du kan även använda "git switch" i nyare versioner.',
    ],
    merge: [
      'Du behöver slå ihop två kodgrenar.',
      'Kommandot börjar med "git m..."',
      'Kolla att du står på rätt branch innan du kör det.',
    ],
    rebase: [
      'Du flyttar commits till en ny bas.',
      'Kommandot börjar med "git r..."',
      'Rebase gör historiken snyggare men kräver försiktighet.',
    ],
    checkout: [
      'Du ska byta till en annan branch.',
      'Kommandot börjar med "git c..."',
      'I nyare Git används "git switch".',
    ],
    workflow: [
      'Det handlar om att skapa en CI-fil under .github/workflows/.',
      'Tänk YAML, Node-version och actions som checkout/setup-node.',
      'Ingen kod behövs här - bara rätt struktur.',
    ],
    general: [
      'Läs uppgiften noga.',
      'Fundera vilket Git-kommando som passar här.',
      'Titta på vad som ska hända: skapa, spara, pusha, slå ihop…',
    ],
  };

  const hints = baseHints[context] ?? baseHints.general;
  const idx = Math.min(misses, hints.length - 1);

  return hints[idx];
}
