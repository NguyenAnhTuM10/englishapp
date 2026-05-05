# Contributing

## Branch naming

```
feature/<phase>-<short-description>
```

Examples: `feature/setup-docker`, `feature/retell-ai-eval`, `feature/flashcard-fsrs`

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|--------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code change that is not a fix or feature |
| `test:` | Adding or updating tests |
| `chore:` | Build scripts, dependencies, tooling |
| `docs:` | Documentation only |

Example: `feat: add retell scoring endpoint`

## Running tests locally before pushing

**Backend:**
```bash
cd backend
./gradlew build        # Linux / macOS
gradlew.bat build      # Windows
```

**Frontend:**
```bash
cd frontend
npm run lint           # 0 warnings allowed
npm run test:run       # vitest run (non-watch)
npm run build          # ensure production build passes
```

## Pull requests

- One logical change per PR
- CI must be green before merging
- Reference the relevant prompt file or task in the PR description if applicable
