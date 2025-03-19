# Exercise 2: Building a MediaStore

In this exercise, you will create a new NgRx Signal Store to manage movie and TV show data, replacing the complex RxJS patterns in the current `MediaOverviewComponent`.

## Objective

Learn how to:

- Create a SignalStore for handling async data from an API
- Use `rxMethod` to handle search functionality
- Replace RxJS-heavy patterns with a more declarative approach
- Implement loading states and error handling

## Background

The application currently uses RxJS observables in the `MediaOverviewComponent` to manage the state of trending and searched movies and TV shows. This approach works but can be complex and verbose.

Your task is to create a MediaStore that centralizes this state management logic, making it more maintainable and easier to understand.

## Instructions

1. **Create a new file** at `src/app/stores/media.store.ts`

2. **Define the state interface**:

   - Define a `MediaState` interface that includes trending movies, trending shows, search results, and a loading state
   - Create initial state for the store

3. **Create the SignalStore**:

   - Use the `signalStore` function to create a new store
   - Add state using the `withState` feature
   - Add computed properties using the `withComputed` feature
   - Implement methods using the `withMethods` feature, including `rxMethod` for search functionality

4. **Refactor the MediaOverviewComponent**:

   - Inject the store instead of using observables directly
   - Update the template to use signal-based properties from the store
   - Use the store's methods for searching

5. **Test your implementation**:
   - Verify that trending movies and shows are displayed
   - Test the search functionality
   - Check that loading states are correctly handled

## Tips

- Start by analyzing the existing `MediaOverviewComponent` to understand its functionality
- Use the `rxMethod` function from `@ngrx/signals/rxjs-interop` for handling search
- Consider using the `tapResponse` operator for handling API response
- Make sure to handle loading states properly for a good user experience

## Bonus Challenges

If you finish early, try these additional challenges:

1. Add error handling to the store
2. Implement pagination for search results
3. Add sorting and filtering capabilities
4. Implement caching of previous search results

## Resources

- [NgRx Signal Store Documentation](https://ngrx.io/guide/signals/signal-store)
- [RxJS Integration Guide](https://ngrx.io/guide/signals/rxjs-integration)
- [withMethods Documentation](https://ngrx.io/api/signals/withMethods)
- [rxMethod Documentation](https://ngrx.io/api/signals/rxjs-interop/rxMethod)
