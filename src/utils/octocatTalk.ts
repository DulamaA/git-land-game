export const talk = {
  defaultIdle: (n: number, title: string) => `Level ${n}: ${title}`,
  info: [
    'Snyggt jobbat! 💪',
    'Bra där, fortsätt så!',
    'Commiten gick igenom! ✅',
    'Allt ser fint ut ✨',
    'Du är på rätt spår 🧭',
  ],

  error: [
    'Hmm... något blev fel 🤔',
    'Försök igen, kolla kommandot!',
    'Nästan rätt — kolla mellanslagen 👀',
    'Aj då, flaggan verkar saknas 🚩',
    'Inte riktigt... prova igen 🔁',
  ],

  happy: [
    'Wohoo! Nästa nivå väntar 🚀',
    'Du klarade det! 🎉',
    'Git ninja! 🐱‍👤',
    'Perfekt commit! 💾',
  ],
};

export function pick(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}