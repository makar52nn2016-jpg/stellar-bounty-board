# Development Workflow

Branch strategy, commit conventions, and PR lifecycle.

## Branch Strategy

We use a single long-lived `main` branch. All changes land via squash-merged
feature branches.

```
main (always deployable)
  ├── feature/add-currency-pair   ← short-lived, 1 PR
  ├── docs/api-reference          ← short-lived, 1 PR
  └── fix/webhook-replay          ← short-lived, 1 PR
```

## Naming Conventions

| Branch prefix | Use |
| ------------- | --- |
| `feature/`    | New user-visible capability |
| `fix/`        | Bug fix |
| `docs/`       | Documentation only |
| `chore/`      | Maintenance (deps, refactors, CI) |
| `test/`       | Test-only additions |
| `experiment/` | Throwaway exploratory work |

Examples: `feature/multi-currency-bounty`, `fix/openapi-drift`,
`docs/TESTING.md`.

## Commit Messages

We follow Conventional Commits. The scope is optional but recommended.

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

Common types: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`, `perf`.

Examples:

- `feat(api): add POST /api/bounties/:id/refund endpoint`
- `fix(webhook): handle GitHub ping event gracefully`
- `docs: add DEBUGGING.md`

The squash-merge commit on `main` will use the PR title as the commit subject —
keep it under 72 characters.

## Pull Request Lifecycle

1. **Open the PR** against `main` from a feature branch in a fork.
2. **CI runs** automatically: lint, typecheck, unit tests, OpenAPI drift check.
3. **Review** by at least one maintainer. Address comments by pushing new
   commits to the same branch.
4. **Squash merge** — the PR title becomes the commit subject on `main`.
5. **Delete the feature branch** after merge (GitHub does this automatically if
   configured).

## PR Size

Aim for PRs under 400 lines of diff. If a change is larger, split it into
stacked PRs:

- PR 1: data model + tests (no behaviour change)
- PR 2: API endpoint + integration tests
- PR 3: frontend integration

Each PR should be releasable on its own.

## Draft PRs

Use draft PRs for work-in-progress that you want early feedback on. Drafts do
not trigger CI on every push (saves Actions minutes).

## Force-Pushing

Force-pushing to a feature branch is OK **before** merge. After merge, do not
force-push — the branch will be deleted.

## Hotfixes

For production issues:

1. Branch from `main`: `git checkout -b fix/hotfix-<issue>`.
2. Open PR with `priority/P0` label.
3. After merge, deploy immediately.

## Release Cadence

We don't follow a fixed cadence. Releases are cut when:

- A P0/P1 fix lands, OR
- A meaningful feature set accumulates (every 1-2 weeks typical).

See `docs/RELEASE_PROCESS.md` for the cut-a-release checklist.

## See Also

- `docs/CONTRIBUTING.md` — first-time contributor guide
- `docs/RELEASE_PROCESS.md` — release checklist
- `docs/ISSUE_TRIAGE.md` — how issues are labelled
