# Quickstart: Favorite Currencies Feature

## 1. Overview

This feature allows users to mark up to 5 currencies as favorites, which appear at the top of all currency selectors and persist in localStorage.

## 2. How to Run

- Start the app: `npm run dev`
- Run tests: `npm run test`

## 3. Key Files

- UI: `components/CurrencySelect.tsx`, `components/AmountInput.tsx`
- Logic: `hooks/useConverter.ts`, `utils/storage.ts`

## 4. Testing

- Unit: `utils/storage.test.ts`, `hooks/useConverter.test.ts`
- Integration: `components/CurrencySelect.test.tsx`

## 5. Accessibility

- All favorite actions must be keyboard accessible and screen reader friendly.

## 6. Adding/Removing Favorites

- Click the star icon next to a currency to add/remove it from favorites.
- If 5 favorites are already set, adding another will show a feedback message.

## 7. Persistence

- Favorites are stored in localStorage under a dedicated key.
- Clearing browser storage will reset favorites.
