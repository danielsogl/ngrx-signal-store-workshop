import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatDividerModule,
  ],
})
export default class TodoComponent {
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  newTodoTitle = '';

  // Private signals for internal state management
  private readonly todosSignal = signal<Todo[]>([
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
  ]);
  private readonly filterSignal = signal<'all' | 'active' | 'completed'>('all');

  // Public read-only signals
  readonly todos = this.todosSignal.asReadonly();
  readonly filter = this.filterSignal.asReadonly();

  // Computed signals for derived state
  readonly filteredTodos = computed(() => {
    const filter = this.filterSignal();
    const todos = this.todosSignal();

    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  });

  readonly completedCount = computed(
    () => this.todosSignal().filter((todo) => todo.completed).length,
  );

  readonly activeCount = computed(
    () => this.todosSignal().filter((todo) => !todo.completed).length,
  );

  addTodo() {
    if (!this.newTodoTitle.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: this.newTodoTitle.trim(),
      completed: false,
      createdAt: new Date(),
    };

    this.todosSignal.update((todos) => [...todos, newTodo]);
    this.snackBar.open(`Added todo: ${newTodo.title}`, 'Close', {
      duration: 3000,
    });
    this.newTodoTitle = '';
  }

  toggleTodo(id: string) {
    this.todosSignal.update((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          const updated = { ...todo, completed: !todo.completed };
          const status = updated.completed ? 'completed' : 'active';
          this.snackBar.open(`Marked "${todo.title}" as ${status}`, 'Close', {
            duration: 3000,
          });
          return updated;
        }
        return todo;
      }),
    );
  }

  removeTodo(id: string) {
    const todoToRemove = this.todosSignal().find((todo) => todo.id === id);
    if (todoToRemove) {
      this.todosSignal.update((todos) =>
        todos.filter((todo) => todo.id !== id),
      );
      this.snackBar.open(`Removed todo: ${todoToRemove.title}`, 'Close', {
        duration: 3000,
      });
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filterSignal.set(filter);
  }

  clearCompleted() {
    const count = this.completedCount();
    if (count > 0) {
      this.todosSignal.update((todos) =>
        todos.filter((todo) => !todo.completed),
      );
      this.snackBar.open(
        `Cleared ${count} completed todo${count === 1 ? '' : 's'}`,
        'Close',
        { duration: 3000 },
      );
    }
  }
}
