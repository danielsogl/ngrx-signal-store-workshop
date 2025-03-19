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
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

/**
 * Define the initial state
 */
export const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

/**
 * Create the TodoStore
 */
export const TodoStore = signalStore(
  // Define the state shape
  withState<TodoState>(initialState),

  // Define computed values
  withComputed(({ todos, filter }) => ({
    filteredTodos: computed(() => {
      const currentFilter = filter();
      const currentTodos = todos();

      switch (currentFilter) {
        case 'active':
          return currentTodos.filter((todo) => !todo.completed);
        case 'completed':
          return currentTodos.filter((todo) => todo.completed);
        default:
          return currentTodos;
      }
    }),

    completedCount: computed(
      () => todos().filter((todo) => todo.completed).length,
    ),

    activeCount: computed(
      () => todos().filter((todo) => !todo.completed).length,
    ),
  })),

  // Define methods for state updates
  withMethods(({ todos, ...store }) => ({
    addTodo(title: string) {
      if (!title.trim()) return;

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: title.trim(),
        completed: false,
        createdAt: new Date(),
      };

      patchState(store, { todos: [...todos(), newTodo] });
    },

    toggleTodo(id: string) {
      patchState(store, {
        todos: todos().map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      });
    },

    removeTodo(id: string) {
      patchState(store, {
        todos: todos().filter((todo) => todo.id !== id),
      });
    },

    setFilter(filter: 'all' | 'active' | 'completed') {
      patchState(store, { filter });
    },

    clearCompleted() {
      patchState(store, {
        todos: todos().filter((todo) => !todo.completed),
      });
    },
  })),
);
