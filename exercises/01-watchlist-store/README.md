# Exercise 1: Creating a WatchlistStore

In this exercise, you will convert the existing `WatchlistService` that uses vanilla Angular signals to an NgRx Signal Store implementation.

## Objective

Learn how to:

- Create a SignalStore with state, computed properties, and methods
- Use `patchState` to update store state
- Refactor existing components to work with the new store

## Background

The application currently has a `WatchlistService` that manages a list of movies and TV shows that the user wants to watch. The service uses Angular signals to maintain the state of the watchlist and provides methods to add, remove, and update items.

Your task is to convert this service to use NgRx Signal Store, which provides a more structured approach to state management.

## Instructions

1. **Create a new file** at `src/app/stores/watchlist.store.ts`

2. **Define the state interface**:

   - Define a `WatchlistState` interface that includes an array of `WatchlistItem`
   - Create initial state for the store

3. **Create the SignalStore**:

   - Use the `signalStore` function to create a new store
   - Add state using the `withState` feature
   - Convert the existing computed properties using the `withComputed` feature
   - Implement methods using the `withMethods` feature

4. **Update the components** to use the new store:

   - Inject the store where the service is currently used
   - Update component methods to use the store's methods

5. **Test your implementation**:
   - Add items to the watchlist
   - Remove items from the watchlist
   - Toggle the watched status of items
   - Verify that the watchlist is correctly updated and displayed

## Tips

- Start by looking at the existing `WatchlistService` to understand its functionality
- The SignalStore pattern follows a similar structure to the existing service, but with a more declarative approach
- Use the `patchState` function to update the store state immutably
- Remember to provide the store at the component level or globally depending on your needs

## Bonus Challenges

If you finish early, try these additional challenges:

1. Add persistence using localStorage and the `withHooks` feature
2. Add additional filtering options using `withComputed`
3. Add undo/redo functionality using a command pattern

## Resources

- [NgRx Signal Store Documentation](https://ngrx.io/guide/signals/signal-store)
- [withState Documentation](https://ngrx.io/api/signals/withState)
- [withComputed Documentation](https://ngrx.io/api/signals/withComputed)
- [withMethods Documentation](https://ngrx.io/api/signals/withMethods)
