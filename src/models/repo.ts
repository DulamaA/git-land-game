export type Commit = { id: string; msg: string };

// Define the structure of the repository state
export type RepoState = {
  initialized: boolean;
  current: string;
  branches: Record<string, Commit[]>;
  remotes: { origin?: true };
};

// Define status message types
export type StatusMsg =
  | { type: 'info'; text: string }
  | { type: 'ok'; text: string }
  | { type: 'error'; text: string };

// Initial state of the repository
export const initialRepoState: RepoState = {
  initialized: false,
  current: 'main',
  branches: {},
  remotes: {},
};

// Generate a random commit ID
function id() {
  return Math.random().toString(36).slice(2, 8);
}

// Apply the effect of a user command on the repository state
export function applyEffect(
  repo: RepoState,
  matchedExpected: string,
  userInput: string,
): { repo: RepoState; message: StatusMsg } {
  const next: RepoState = structuredClone(repo);

  const ok = (text: string): StatusMsg => ({ type: 'ok', text });
  const info = (text: string): StatusMsg => ({ type: 'info', text });

  const cmd = matchedExpected.toLowerCase();

  const extractCommitMsg = (s: string) => {
    const m = s.match(/-m\s+(.+)$/i);
    if (!m) return 'commit';
    const raw = m[1].trim();
    return raw
      .replace(/^"(.*)"$/, '$1')
      .replace(/^'(.*)'$/, '$1')
      .trim();
  };

  const currentBranch = () => next.current || 'main';

  // --- init---
  if (/^git\s+init$/i.test(cmd)) {
    next.initialized = true;
    next.branches.main ||= [];
    next.current = 'main';
    return { repo: next, message: ok('Repository initierat.') };
  }

  // --- remote add / set-url---
  if (/^git\s+remote\s+add\s+origin\s+/i.test(cmd)) {
    next.remotes.origin = true;
    return { repo: next, message: ok('Remote "origin" tillagd.') };
  }
  if (/^git\s+remote\s+set-url\s+origin\s+/i.test(cmd)) {
    next.remotes.origin = true;
    return { repo: next, message: ok('Remote "origin" uppdaterad.') };
  }

  // --- checkout / switch (skapa/byt branch) ---
  if (/^git\s+checkout\s+-B\s+main$/i.test(cmd)) {
    next.branches.main ||= [];
    next.current = 'main';
    return { repo: next, message: ok('Bytte till main (ev. skapad).') };
  }
  if (/^git\s+checkout\s+-b\s+/i.test(cmd)) {
    const name = userInput.trim().split(/\s+/).at(-1)!;
    const base = next.branches[currentBranch()] ?? [];
    next.branches[name] = [...base];
    next.current = name;
    return { repo: next, message: ok(`Ny branch: ${name}`) };
  }
  if (/^git\s+checkout\s+main$/i.test(cmd) || /^git\s+switch\s+main$/i.test(cmd)) {
    next.branches.main ||= next.branches.main || [];
    next.current = 'main';
    return { repo: next, message: ok('Bytte till main') };
  }
  if (/^git\s+switch\s+-c\s+/i.test(cmd)) {
    const name = userInput.trim().split(/\s+/).at(-1)!;
    const base = next.branches[currentBranch()] ?? [];
    next.branches[name] = [...base];
    next.current = name;
    return { repo: next, message: ok(`Ny branch: ${name}`) };
  }
  if (/^git\s+switch\s+[\w./-]+$/i.test(cmd)) {
    const name = userInput.trim().split(/\s+/).at(-1)!;
    if (!next.branches[name]) next.branches[name] = [];
    next.current = name;
    return { repo: next, message: ok(`Bytte till ${name}`) };
  }

  // --- add ---
  if (/^git\s+add\s+(?:\.|-A|--all)$/i.test(cmd) || /^git\s+add\s+.+/i.test(cmd)) {
    return { repo: next, message: info('Staged (simulerat)') };
  }

  // --- commit ---
  if (/^git\s+commit\s+-m\s+/i.test(cmd)) {
    if (!next.initialized) {
      next.initialized = true;
      next.branches.main ||= [];
      next.current = 'main';
    }
    const b = currentBranch();
    next.branches[b] ||= [];
    next.branches[b].push({ id: id(), msg: extractCommitMsg(userInput) });
    return { repo: next, message: ok('Commit skapad') };
  }
  if (/^git\s+commit$/i.test(cmd)) {
    // to accept “git commit” whitout -m
    const b = currentBranch();
    next.branches[b] ||= [];
    next.branches[b].push({ id: id(), msg: 'commit' });
    return { repo: next, message: ok('Commit skapad') };
  }

  // --- fetch/pull ---
  if (/^git\s+fetch(\s+origin)?$/i.test(cmd)) {
    return { repo: next, message: info('Fetch (simulerat)') };
  }
  if (/^git\s+pull\s+--ff-only(\s+origin\s+main)?$/i.test(cmd)) {
    return { repo: next, message: info('Pull (simulerat)') };
  }

  // --- push ---
  if (/^git\s+push(\s+-u\s+origin\s+[\w./-]+)?$/i.test(cmd)) {
    return { repo: next, message: info('Push (simulerat)') };
  }
  if (/^git\s+push\s+--force-with-lease$/i.test(cmd)) {
    return { repo: next, message: info('Push (force-with-lease, simulerat)') };
  }

  // --- merge/rebase ---
  if (/^git\s+merge\s+origin\/main$/i.test(cmd)) {
    return { repo: next, message: info('Merge (simulerat)') };
  }
  if (/^git\s+rebase\s+origin\/main$/i.test(cmd)) {
    return { repo: next, message: info('Rebase (simulerat)') };
  }
  if (/^git\s+rebase\s+-i\s+(origin\/main|HEAD~\d+)$/i.test(cmd)) {
    return { repo: next, message: info('Interaktiv rebase (simulerad)') };
  }
  if (/^git\s+rebase\s+--continue$/i.test(cmd)) {
    return { repo: next, message: info('Rebase fortsatte (simulerad)') };
  }

  // --- branch delete ---
  if (/^git\s+branch\s+-d\s+[\w./-]+$/i.test(cmd)) {
    return { repo: next, message: info('Branch raderad (simulerat)') };
  }

  // --- gh pr ---
  if (/^gh\s+pr\s+create/i.test(cmd)) {
    return { repo: next, message: info('PR skapad (simulerad)') };
  }
  if (/^gh\s+pr\s+merge/i.test(cmd)) {
    return { repo: next, message: info('PR mergad (simulerad)') };
  }

  return { repo: next, message: info('Väntar på kommando...') };
}
