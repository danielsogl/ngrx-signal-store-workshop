# Exercise 3: Migrating Component Signals to Signal Store

In this exercise, you will learn how to migrate from component-level signals to NgRx Signal Store for more structured state management.

## Objective

Learn how to:

- Extract component state into a Signal Store
- Implement state management with NgRx Signal Store
- Use `patchState` for immutable state updates
- Create computed values with Signal Store
- Define methods for state operations

## Background

The application has a Todo component that manages its state using component-level signals. This approach works well for simple components, but as the application grows, managing state at the component level can become cumbersome.

NgRx Signal Store provides a more structured and scalable approach to state management, with clear separation of concerns and improved testability.

## Instructions

1. **Explore the Todo Component**:

   - First, explore the Todo component implementation at `src/app/components/todo/todo.component.ts`
   - Notice how it uses component-level signals for state management
   - Pay attention to the different operations (add, toggle, remove, filter)

2. **Complete the Signal Store Implementation**:

   - Open `exercises/03-todo-store/template/todo.store.ts`
   - Complete the implementation following the TODO comments

3. **Implement withState**:

   - The state interface and initial state are already defined
   - Complete the `withState` feature to define the store's state

4. **Implement withComputed**:

   - Create computed properties for:
     - `filteredTodos`: Filtered todos based on the current filter
     - `completedCount`: Count of completed todos
     - `activeCount`: Count of active todos

5. **Implement withMethods**:

   - Implement methods for:
     - `addTodo`: Add a new todo
     - `toggleTodo`: Toggle a todo's completed status
     - `removeTodo`: Remove a todo
     - `setFilter`: Set the current filter
     - `clearCompleted`: Clear all completed todos
   - Use `patchState` to update the store state immutably

6. **Compare with Solution**:
   - Check your implementation against the solution in `exercises/03-todo-store/solution/todo.store.ts`
   - Review the example component that uses the store in `exercises/03-todo-store/solution/example-component.ts`

## Component vs Store Comparison

### Component-level Signals:

```typescript
// Component-level state management
private todosSignal = signal<Todo[]>([]);
private filterSignal = signal<'all' | 'active' | 'completed'>('all');

readonly filteredTodos = computed(() => {
  const filter = this.filterSignal();
  const todos = this.todosSignal();

  switch (filter) {
    // filtering logic
  }
});

addTodo() {
  this.todosSignal.update(todos => [...todos, newTodo]);
}
```

### Signal Store:

```typescript
// Signal Store state management
export const TodoStore = signalStore(
  withState<TodoState>({ todos: [], filter: "all" }),

  withComputed(({ todos, filter }) => ({
    filteredTodos: computed(() => {
      // filtering logic
    }),
  })),

  withMethods(({ todos, ...store }) => ({
    addTodo(title: string) {
      patchState(store, { todos: [...todos(), newTodo] });
    },
  })),
);
```

## Key Benefits of Signal Store

1. **Separation of Concerns**: Separate state management from component logic
2. **Improved Testability**: Test state logic independently of components
3. **Better Organization**: Group related state and logic
4. **Reusability**: Share state across multiple components
5. **Predictable Updates**: Immutable updates with `patchState`
6. **Dependency Injection**: Leverage Angular's DI system for state management

## Bonus Challenges

If you finish early, try these additional challenges:

1. Add persistence using localStorage and the `withHooks` feature
2. Implement an undo feature to restore deleted todos
3. Add support for todo categories or tags
4. Add a search function with highlighting

## Resources

- [NgRx Signal Store Documentation](https://ngrx.io/guide/signals/signal-store)
- [Angular Signals](https://angular.io/guide/signals)
- [withState Documentation](https://ngrx.io/api/signals/withState)
- [withComputed Documentation](https://ngrx.io/api/signals/withComputed)
- [withMethods Documentation](https://ngrx.io/api/signals/withMethods)
