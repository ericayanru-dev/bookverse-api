# Contributing Guide - BookVerse API

## Branch Strategy

We follow a strict Git branching strategy to maintain code quality:

### Branch Types

- **`main`** → Production-ready code (protected)
- **`develop`** → Integration branch (latest working features)
- **`feature/*`** → New features (e.g. `feature/books-crud`, `feature/auth-middleware`)
- **`bugfix/*`** → Bug fixes (e.g. `bugfix/jwt-validation`)
- **`hotfix/*`** → Critical production fixes
- **`chore/*`** → Setup, documentation, refactoring

### Workflow Rules

1. Always work on your own feature branch
2. Never push directly to `main` or `develop`
3. Pull latest `develop` before starting new work:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
4. Keep PRs small and focused
5. All code must pass CI before merging

### Commit Message Format
Use conventional commits:

*feat*: new feature
*fix*: bug fix
*chore*: setup/maintenance
*docs*: documentation
*refactor*: code improvement

Example: feat(books): add CRUD routes