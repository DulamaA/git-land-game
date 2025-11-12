/**
* This file show the simulated Git repository model and command effects.
* It defines repo state/types and applies updates in applyEffect based on matched user commands.
* The UI consumes the returned repo state and status messages; rendering logic lives elsewhere.
*/


export type Commit = { id: string; msg: string };

// Define the structure of the repository state
export type RepoState = {
  initialized: boolean;
  current: string;
  branches: Record<string, Commit[]>;
  remotes: { origin?: true | string };
};

// Define status message types
export type StatusMsg = { type: 'info'; text: string } | { type: 'ok'; text: string } | { type: 'error'; text: string };

// Initial state of the repository
export function createInitialRepoState(): RepoState {
  return {
    initialized: false,
    current: 'main',
    branches: {},
    remotes: {},
  };
}

// Generate a random commit ID
export function id() {
  return Math.random().toString(36).slice(2, 8);
}

// Apply the effect of a user command on the repository state
export function applyEffect(prev: RepoState,
  matchedExpected: string,
  userInput: string): { repo: RepoState; message: StatusMsg } {
  const next: RepoState = structuredClone(prev);

  next.branches ||= {};
  next.remotes ||= {};

  const ok = (text: string): StatusMsg => ({ type: 'ok', text });
  const info = (text: string): StatusMsg => ({ type: 'info', text });

  const cmd = matchedExpected.trim().replace(/\s+/g, ' ').toLowerCase();

  const genId = () => Math.random().toString(36).slice(2, 10);
  const currentBranch = () => (next.current && next.branches[next.current] ? next.current : 'main');

  const ensureInitialized = () => {
    if (!next.initialized) {
      next.initialized = true;
    }
    if (!next.branches.main) {
      next.branches.main = [];
    }
    if (!next.current) {
      next.current = 'main';
    }
  };

  const getBranchFromInput = (pattern: RegExp): string | null => {
    const m = userInput.match(pattern);

    return m?.[1]?.trim() || null;
  };

  const extractCommitMsg = (s: string) => {
    const m = s.match(/(?:^|\s)-m\s+(?:"([^"]*)"|'([^']*)'|(.+))$/i);
    const raw = (m?.[1] ?? m?.[2] ?? m?.[3] ?? '').trim();

    return raw || 'commit';
  };

  // --- init ---
  if (/^git\s+init$/i.test(cmd)) {
    next.initialized = true;
    next.branches.main ||= [];
    next.current = 'main';

    return { repo: next, message: ok('Repository initierat.') };
  }

  // --- remote add / set-url ---
  if (/^git\s+remote\s+add\s+origin\s+(?:"[^"]+"|'[^']+'|\S+)$/i.test(userInput.trim())) {
    next.remotes.origin = true;

    return { repo: next, message: ok('Remote "origin" tillagd.') };
  }

  if (/^git\s+remote\s+set-url\s+origin\s+(?:"[^"]+"|'[^']+'|\S+)$/i.test(userInput.trim())) {
    next.remotes.origin = true;

    return { repo: next, message: ok('Remote "origin" uppdaterad.') };
  }

  // --- checkout / switch (create/change branch) ---
  if (/^git\s+checkout\s+-b\s+/i.test(cmd)) {
    ensureInitialized();

    const name = getBranchFromInput(/\bcheckout\b\s+-b\s+([^\s]+)/i);
    const base = next.branches[currentBranch()] ?? [];
    if (name) {
      next.branches[name] = [...base];
      next.current = name;

      return { repo: next, message: ok(`Ny branch: ${name}`) };
    }
  }

  if (
    /^git\s+switch\s+main$/i.test(cmd) || // t.ex. "git switch main"
    /^git\s+checkout\s+(?:-B\s*)?main$/i.test(cmd) // "git checkout main" eller "git checkout -B main"
  ) {
    ensureInitialized();
    next.branches.main ||= [];
    next.current = 'main';

    return { repo: next, message: ok('Bytte till main') };
  }


  if (/^git\s+switch\s+-c\s+/i.test(cmd)) {
    ensureInitialized();
    const name = getBranchFromInput(/\bswitch\b\s+-c\s+([^\s]+)/i);
    const base = next.branches[currentBranch()] ?? [];
    if (name) {
      next.branches[name] = [...base];
      next.current = name;

      return { repo: next, message: ok(`Ny branch: ${name}`) };
    }
  }

  if (/^git\s+(?:checkout|switch)\s+[\w./-]+$/i.test(cmd)) {
    ensureInitialized();
    const name = getBranchFromInput(/\bcheckout\s+([^\s]+)/i) ?? getBranchFromInput(/\bswitch\s+([^\s]+)/i);
    if (name) {
      if (!next.branches[name]) {
        next.branches[name] = [];
      }
      next.current = name;

      return { repo: next, message: ok(`Bytte till ${name}`) };
    }
  }

  // --- add ---
  if (/^git\s+add\s+.+/i.test(cmd)) {
    return { repo: next, message: info('Staged (simulerat)') };
  }

  // --- commit ---
  if (/^git\s+commit\b/i.test(cmd)) {
    ensureInitialized();
    const msg = /^git\s+commit\s+-m\b/i.test(cmd) ? extractCommitMsg(userInput) : 'commit';
    const b = currentBranch();
    next.branches[b] ||= [];
    next.branches[b].push({ id: genId(), msg });

    return { repo: next, message: ok(`Commit skapad${msg ? `: "${msg}"` : ''}`) };
  }

  // --- fetch/pull ---
  if (/^git\s+fetch(\s+origin)?$/i.test(cmd)) {
    return { repo: next, message: info('Fetch (simulerat)') };
  }
  if (/^git\s+pull\b/i.test(cmd)) {
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
  if (/^git\s+merge\s+[\w./-]+$/i.test(cmd)) {
    return { repo: next, message: info('Merge (simulerat)') };
  }
  if (/^git\s+rebase\b/i.test(cmd)) {
    if (/--continue/i.test(userInput)) {
      return { repo: next, message: info('Rebase fortsatte (simulerad)') };
    }

    return { repo: next, message: info('Rebase (simulerat)') };
  }

  // --- branch delete ---
  if (/^git\s+branch\s+-d\s+[\w./-]+$/i.test(cmd)) {
    const name = getBranchFromInput(/\bbranch\b\s+-d\s+([\w./-]+)/i);
    if (name && next.branches[name]) {
      delete next.branches[name];
      if (next.current === name) {
        next.current = 'main';
        next.branches.main ||= [];
      }
    }

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
