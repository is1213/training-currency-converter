# Data Model: Favorite Currencies

## Entity: FavoriteCurrency

- code: string (currency code, e.g., 'USD')
- name: string (currency name, e.g., 'US Dollar')
- symbol: string (currency symbol, e.g., '$')

## Entity: FavoriteCurrencyList

- favorites: FavoriteCurrency[] (max 5)
- lastUpdated: number (timestamp, optional)

## Relationships

- Each user (browser) has a single FavoriteCurrencyList, persisted in localStorage.
- FavoriteCurrency is a subset of the global CURRENCIES list.

## Validation Rules

- No more than 5 favorites at any time.
- All favorites must be valid currencies from the supported list.
- No duplicates allowed.

## State Transitions

- Add favorite: If <5, add; else, reject with feedback.
- Remove favorite: Remove from list.
- Persist: Save updated list to localStorage after any change.
