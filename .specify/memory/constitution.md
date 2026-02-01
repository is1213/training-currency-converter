<!--
Sync Impact Report
------------------
Version change: none → 1.0.0
Principles added:
	- Code Quality
	- Testing Standards (80% coverage)
	- Accessibility (WCAG 2.1 AA)
Removed: Template placeholders, unused sections
Templates requiring update: Constitution Check in plan-template.md (✅ reviewed, no change needed)
Deferred: RATIFICATION_DATE (TODO)
-->

# Currency Converter Constitution

## Core Principles

### I. Code Quality

All code MUST adhere to clear, consistent style and best practices:

- Use idiomatic, modern TypeScript and React patterns
- Enforce static typing and strict null checks
- Code must be self-documenting and maintainable
- Linting and formatting are mandatory (auto-fix on commit)
- No dead code, unused variables, or commented-out blocks in main branches

_Rationale: High code quality ensures maintainability, reduces bugs, and enables rapid onboarding._

### II. Testing Standards (80% Coverage)

Automated tests are REQUIRED for all features and bug fixes:

- Minimum 80% line and branch coverage (Jest, React Testing Library)
- All critical logic, reducers, and utilities must be covered
- No PR may be merged if coverage drops below threshold
- Tests must be reliable, isolated, and repeatable

_Rationale: High test coverage prevents regressions and enables safe refactoring._

### III. Accessibility (WCAG 2.1 AA)

All user-facing features MUST meet WCAG 2.1 AA accessibility standards:

- Semantic HTML and ARIA roles where appropriate
- Sufficient color contrast and keyboard navigation
- All interactive elements must be accessible via screen readers
- Automated and manual accessibility checks required before release

_Rationale: Accessibility is a non-negotiable requirement for inclusivity and legal compliance._

## Governance

This constitution supersedes all other project practices. Amendments require documentation, team approval, and a migration plan. All pull requests and code reviews MUST verify compliance with these principles. Any exception must be justified and documented.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2026-02-01
