import { computed, inject, isDevMode } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Todo } from '../../../src/app/models/todo.model';

type TodoFilter = 'all' | 'active' | 'completed';

interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(({ todos }) => ({
    todos$: toObservable(todos),
    _snackBar: inject(MatSnackBar),
  })),
  withComputed(({ filter, todos }) => ({
    activeCount: computed(
      () => todos().filter((todo) => !todo.completed).length,
    ),
    completedCount: computed(
      () => todos().filter((todo) => todo.completed).length,
    ),
    filteredTodos: computed(() => {
      switch (filter()) {
        case 'active':
          return todos().filter((todo) => !todo.completed);
        case 'completed':
          return todos().filter((todo) => todo.completed);
        default:
          return todos();
      }
    }),
  })),
  withMethods((state) => ({
    addTodo: (title: string) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date(),
      };

      patchState(state, { todos: [...state.todos(), newTodo] });

      state._snackBar.open(`Added todo: ${newTodo.title}`, 'Close', {
        duration: 3000,
      });
    },
    toggleTodo: (id: string) => {
      const todo = state.todos().find((todo) => todo.id === id);
      if (todo) {
        patchState(state, {
          todos: state
            .todos()
            .map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        });

        const status = todo.completed ? 'completed' : 'active';

        state._snackBar.open(`Marked "${todo.title}" as ${status}`, 'Close', {
          duration: 3000,
        });
      }
    },
    removeTodo: (id: string) => {
      const todo = state.todos().find((todo) => todo.id === id);
      if (todo) {
        patchState(state, {
          todos: state.todos().filter((t) => t.id !== id),
        });

        state._snackBar.open(`Removed todo: ${todo.title}`, 'Close', {
          duration: 3000,
        });
      }
    },
    setFilter: (filter: TodoFilter) => {
      patchState(state, { filter });
    },
    clearCompleted: () => {
      const count = state.completedCount();
      if (count > 0) {
        patchState(state, {
          todos: state.todos().filter((todo) => !todo.completed),
        });

        state._snackBar.open(
          `Cleared ${count} completed todo${count === 1 ? '' : 's'}`,
          'Close',
          { duration: 3000 },
        );
      }
    },
  })),
  withHooks((state) => ({
    onInit: () => {
      if (isDevMode()) {
        watchState(state, () => {
          console.log('Todo State:', state.todos());
        });
      }

      patchState(state, {
        todos: [
          {
            id: '1',
            title: 'Learn Angular Signals',
            completed: false,
            createdAt: new Date(),
          },
          {
            id: '2',
            title: 'Learn NgRx Signal Store',
            completed: false,
            createdAt: new Date(),
          },
        ],
      });
    },
  })),
);
