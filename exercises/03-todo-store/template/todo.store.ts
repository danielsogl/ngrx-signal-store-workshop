import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Todo } from '../../../src/app/models/todo.model';

/**
 * Define the TodoState interface
 */
export interface TodoState {
  // TODO: Add state properties here
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

/**
 * Define the initial state
 */
export const initialState: TodoState = {
  // TODO: Initialize state
  todos: [],
  filter: 'all',
};

/**
 * Create the TodoStore
 *
 * Implement with:
 * - withState: to define the state shape
 * - withComputed: to create derived values
 * - withMethods: to define operations for state updates
 */
export const TodoStore = signalStore(
  // TODO: Implement withState
  withState(initialState),

  // TODO: Implement withComputed for filteredTodos, completedCount, activeCount
  withComputed(({ todos, filter }) => ({
    // Implementation here
  })),

  // TODO: Implement withMethods for addTodo, toggleTodo, removeTodo, setFilter, clearCompleted
  withMethods(({ patchState }) => ({
    // Implementation here
  })),
);
