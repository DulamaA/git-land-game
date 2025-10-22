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
  // Clone the current repository state
  const next: RepoState = structuredClone(repo);

  const ok = (text: string): StatusMsg => ({ type: 'ok', text });
  const info = (text: string): StatusMsg => ({ type: 'info', text });

  // Handle different expected commands
  const extractCommitMsg = (s: string) => {
    // Extract commit message from command
    const m = s.match(/-m\s+(.+)$/);
    if (!m) return 'commit';
    // Remove surrounding quotes if present
    return m[1].replace(/^"(.*)"$/, '$1');
  };

  // Process 'git init' command
  const cmd = matchedExpected.toLowerCase();

  // Handle various git commands
  if (/^git init$/i.test(cmd)) {
    next.initialized = true;
    next.branches.main ||= [];
    next.current = 'main';
    return { repo: next, message: ok('Repository initierat.') };
  }

  if (/^git remote add origin /i.test(cmd)) {
    next.remotes.origin = true;
    return { repo: next, message: ok('Remote "origin" tillagd.') };
  }

  if (/^git checkout -b /i.test(cmd)) {
    const name = matchedExpected.split(/\s+/).at(-1)!;
    const base = next.branches[next.current] ?? [];
    next.branches[name] = [...base];
    next.current = name;
    return { repo: next, message: ok('Ny branch: ${name}') };
  }

  if (/^git checkout -b <[\w/()-]+>$/i.test(cmd)) {
    const name = userInput.trim().split(/\s+/).at(-1)!;
    const base = next.branches[next.current] ?? [];
    next.branches[name] = [...base];
    next.current = name;
    return { repo: next, message: ok(`Ny branch: ${name}`) };
  }

  if (/^git checkout -b/.test(cmd) === false && /^git checkout -B main$/i.test(cmd)) {
    next.branches.main ||= [];
    next.current = 'main';
    return { repo: next, message: ok('Bytt/skapa main') };
  }

  if (/^git add \.$/i.test(cmd)) {
    return { repo: next, message: info('Staged (simulerat)') };
  }

  if (/^git commit -m /i.test(cmd)) {
    if (!next.initialized) {
      next.initialized = true;
      next.branches.main ||= [];
      next.current = 'main';
    }
    const b = next.current;
    next.branches[b] ||= [];
    next.branches[b].push({ id: id(), msg: extractCommitMsg(userInput) });
    return { repo: next, message: ok('Commit skapad') };
  }

  if (/^git fetch origin$/i.test(cmd)) {
    return { repo: next, message: info('Fetch (simulerat)') };
  }

  if (/^git pull --ff-only origin main$/i.test(cmd)) {
    return { repo: next, message: info('Pull (simulerat)') };
  }

  if (/^git push( -u origin [\w/.-]+)?$/i.test(cmd)) {
    return { repo: next, message: info('Push (simulerat)') };
  }

  if (/^git merge origin\/main$/i.test(cmd)) {
    return { repo: next, message: info('Merge (simulerat)') };
  }

  if (/^git rebase origin\/main$/i.test(cmd)) {
    return { repo: next, message: info('Rebase (simulerat)') };
  }

  if (/^gh pr /i.test(cmd)) {
    return { repo: next, message: info('PR åtgärd (simulerad)') };
  }

// Default case: no changes made
  return { repo: next, message: info('OK') };
}
