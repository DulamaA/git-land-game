/**
* This file show predefined talk messages for the avatar and a helper to pick a random one.
* It exports the talk presets (idle/info/error/happy) and the pick(arr) utility.
* The UI uses these to display short feedback bubbles during the game.
*/

export const talk = {
  defaultIdle: (n: number, title: string) => `Level ${n}: ${title}`,

  info: [
    'OK - fortsätt till nästa steg. ℹ️', 'Kommandot kördes. ℹ️', 'Status uppdaterad. ℹ️', 'Allt i ordning. ℹ️',
  ],

  error: [
    'Hmm... något blev fel 🤔',
    'Försök igen, kolla kommandot!',
    'Nästan rätt — kolla mellanslagen 👀',
    'Aj då, flaggan verkar saknas 🚩',
    'Inte riktigt... prova igen 🔁',
  ],

  happy: [
    'Snyggt jobbat! 💪',
    'Bra där, fortsätt så!',
    'Commiten gick igenom! ✅',
    'Allt ser fint ut ✨',
    'Du är på rätt spår 🧭',
    'Wohoo! Nästa nivå väntar 🚀',
    'Du klarade det! 🎉',
    'Git ninja! 🐱‍👤',
    'Perfekt commit! 💾',
  ],
};

export function pick(arr: string[]) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return '';
  }

  return arr[Math.floor(Math.random() * arr.length)];
}
