# Phase 0: Research for Favorite Currencies

## Decision: LocalStorage for Persistence

- **Rationale**: The app is client-only and already uses localStorage for history. This ensures persistence across reloads and sessions without backend changes.
- **Alternatives considered**: IndexedDB (overkill for simple key-value), cookies (less secure, not intended for app data).

## Decision: Max 5 Favorites

- **Rationale**: Prevents UI clutter and keeps selection manageable. 5 is a common UX pattern for "quick access" lists.
- **Alternatives considered**: Unlimited (could overwhelm UI), 3 (too restrictive for international users).

## Decision: UI Placement in Selectors

- **Rationale**: Favorites should appear at the top of all currency selectors, visually separated (divider or group label) for discoverability and speed.
- **Alternatives considered**: Separate favorites-only selector (adds complexity), inline star icons only (less discoverable).

## Decision: Mark/Unmark with Star Icon

- **Rationale**: Star icon is a universal pattern for favorites, easily understood by users.
- **Alternatives considered**: Heart icon (less common for currencies), checkbox (not visually distinct for favorites).

## Decision: Feedback for Limit Exceeded

- **Rationale**: Immediate, clear feedback (toast or inline message) prevents confusion and improves UX.
- **Alternatives considered**: Silent failure (bad UX), modal dialog (too disruptive for minor action).

## Decision: Accessibility

- **Rationale**: All favorite actions must be keyboard accessible and screen reader friendly (ARIA labels, focus order, color contrast).
- **Alternatives considered**: None (accessibility is non-negotiable per constitution).

## Decision: Testing

- **Rationale**: Use Jest and React Testing Library for unit and integration tests. MSW for mocking localStorage if needed.
- **Alternatives considered**: Cypress (for E2E, but not required for this feature scope).
