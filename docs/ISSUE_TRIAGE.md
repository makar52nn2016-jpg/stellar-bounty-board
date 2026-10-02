# Issue Triage

How maintainers label and prioritise incoming issues.

## Triage Goal

Every new issue should leave the inbox within 24 hours with either:

- A clear `priority::*` label and an assignee, OR
- A `status::needs-info` label and a clarifying question to the reporter, OR
- A `status::duplicate` label linking to the canonical issue, OR
- A `kind::*` label if it's a feature request, bug, or discussion.

## Labels

### Kind

| Label                | Meaning |
| -------------------- | ------- |
| `kind/bug`           | Reproducible defect |
| `kind/feature`       | Net-new capability |
| `kind/enhancement`   | Improvement to existing capability |
| `kind/question`      | User question, no code change expected |
| `kind/docs`          | Documentation-only work |
| `kind/chore`         | Maintenance (deps, refactors with no behaviour change) |

### Priority

| Label                | Meaning |
| -------------------- | ------- |
| `priority/P0`        | Production down, security disclosure |
| `priority/P1`        | Major feature broken for >1 user |
| `priority/P2`        | Annoying bug, feature request with clear demand |
| `priority/P3`        | Nice-to-have |

### Status

| Label                  | Meaning |
| --------------------- | ------- |
| `status/needs-info`   | Awaiting reporter response |
| `status/blocked`      | Cannot proceed until external dependency resolves |
| `status/duplicate`    | Closes in favour of canonical issue |
| `status/wontfix`      | Maintainers decline to act |
| `status/ready`        | Triaged, ready for a contributor to pick up |

### Bounty

| Label                | Meaning |
| -------------------- | ------- |
| `bounty`             | Has a Stellar escrow funded |
| `bounty/claimed`     | A contributor has reserved the bounty |
| `bounty/paid`        | Escrow released, issue closed |

## Triage Workflow

1. **Read the issue body fully** before labelling.
2. Reproduce the bug locally if `kind/bug` is plausible.
3. Search for duplicates (`gh issue list --state all --search "<keywords>"`).
4. Apply `kind/*`, `priority/*`, and (if appropriate) `status/*` labels in one
   edit.
5. If the issue needs more info, comment with the specific questions and apply
   `status/needs-info`.
6. If a bounty is funded, apply `bounty` and link the escrow contract.

## SLA

| Priority | First response | Resolution target |
| -------- | -------------- | ----------------- |
| P0       | 30 min         | 4 hours           |
| P1       | 4 hours        | 3 days            |
| P2       | 24 hours       | 2 weeks           |
| P3       | 1 week         | Best-effort       |

## Stale Issue Policy

- Issues with `status/needs-info` and no reporter activity for 14 days are
  auto-closed by a stalebot.
- Issues with no `priority/*` label for 7 days get a `priority/P3` default.

## See Also

- `docs/MAINTAINERS.md` — who can triage
- `docs/SECURITY.md` — security disclosure flow
