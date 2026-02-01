# Tasks: Favorite Currencies Feature

## Feature: Favorite Currencies

### Phase 1: Setup

- [ ] T001 Create specs/001-favorite-currencies/favorite-currencies branch and directory structure

### Phase 2: Foundational

- [ ] T002 Add favorite currencies data model to specs/001-favorite-currencies/data-model.md
- [ ] T003 Add localStorage contract to specs/001-favorite-currencies/contracts/localStorage-favorites.json
- [ ] T004 Add Copilot agent context for favorite currencies to .github/agents/copilot-instructions.md

### Phase 3: [US1] Mark Currency as Favorite (P1)

- [ ] T005 [US1] Add favorite currencies state and logic to utils/storage.ts
- [ ] T006 [US1] Add favorite/unfavorite UI (star icon) to components/CurrencySelect.tsx
- [ ] T007 [US1] Add favorite/unfavorite logic to hooks/useConverter.ts
- [ ] T008 [US1] Persist favorites in localStorage and load on app start (utils/storage.ts, hooks/useConverter.ts)
- [ ] T009 [US1] Add unit tests for favorite logic in utils/storage.test.ts
- [ ] T010 [US1] Add integration tests for favorite UI in components/CurrencySelect.test.tsx

### Phase 4: [US2] Favorites Appear at Top (P2)

- [ ] T011 [US2] Update CurrencySelect to display favorites at top, visually separated
- [ ] T012 [US2] Add tests for selector order and separation in components/CurrencySelect.test.tsx

### Phase 5: [US3] Remove Favorite (P3)

- [ ] T013 [US3] Implement remove favorite logic in UI and storage (components/CurrencySelect.tsx, utils/storage.ts)
- [ ] T014 [US3] Add tests for removing favorites in components/CurrencySelect.test.tsx and utils/storage.test.ts

### Final Phase: Polish & Cross-Cutting

- [ ] T015 Add accessibility (ARIA, keyboard) to favorite actions in CurrencySelect.tsx
- [ ] T016 Add feedback for exceeding favorite limit (toast or inline message) in CurrencySelect.tsx
- [ ] T017 Update documentation in specs/001-favorite-currencies/quickstart.md
- [ ] T018 Verify 80%+ test coverage for all new code
- [ ] T019 Manual accessibility and usability review

## Dependencies

- US1 must be completed before US2 and US3
- US2 and US3 can be developed in parallel after US1

## Parallel Execution Examples

- T009 and T010 (unit and integration tests for US1) can be done in parallel
- T012 and T014 (tests for US2 and US3) can be done in parallel

## Implementation Strategy

- MVP: Complete all [US1] tasks (T005–T010)
- Incrementally deliver [US2] and [US3] after MVP

---

All tasks follow the strict checklist format and are independently testable per user story.
