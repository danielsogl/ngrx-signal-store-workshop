import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { TodoStore } from './todo.store';

@Component({
  selector: 'app-todo-with-store',
  template: `
    <div class="todo-container">
      <mat-card class="todo-card">
        <mat-card-header>
          <mat-card-title>Todo List</mat-card-title>
          <mat-card-subtitle>
            @if (store.todos().length > 0) {
              <span>
                {{ store.activeCount() }} active /
                {{ store.completedCount() }} completed
              </span>
            }
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- New Todo Form -->
          <div class="todo-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Add new todo</mat-label>
              <input
                matInput
                [(ngModel)]="newTodoTitle"
                placeholder="What needs to be done?"
                (keyup.enter)="addTodo()"
              />
              @if (newTodoTitle) {
                <button
                  matSuffix
                  mat-icon-button
                  aria-label="Clear"
                  (click)="newTodoTitle = ''"
                >
                  <mat-icon>close</mat-icon>
                </button>
              }
            </mat-form-field>
            <button
              mat-raised-button
              color="primary"
              (click)="addTodo()"
              [disabled]="!newTodoTitle.trim()"
            >
              Add
            </button>
          </div>

          <mat-divider class="divider"></mat-divider>

          <!-- Filters -->
          <div class="filter-container">
            <mat-button-toggle-group
              [value]="store.filter()"
              (change)="store.setFilter($event.value)"
              aria-label="Todo Filter"
            >
              <mat-button-toggle value="all">All</mat-button-toggle>
              <mat-button-toggle value="active">Active</mat-button-toggle>
              <mat-button-toggle value="completed">Completed</mat-button-toggle>
            </mat-button-toggle-group>

            <button
              mat-button
              color="warn"
              (click)="store.clearCompleted()"
              [disabled]="store.completedCount() === 0"
            >
              Clear Completed
            </button>
          </div>

          <!-- Todo List -->
          <div class="todo-list">
            @for (todo of store.filteredTodos(); track todo.id) {
              <div class="todo-item">
                <mat-checkbox
                  [checked]="todo.completed"
                  (change)="store.toggleTodo(todo.id)"
                  color="primary"
                >
                  <span [class.completed]="todo.completed">{{
                    todo.title
                  }}</span>
                </mat-checkbox>
                <button
                  mat-icon-button
                  color="warn"
                  aria-label="Delete todo"
                  (click)="store.removeTodo(todo.id)"
                >
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            } @empty {
              <div class="empty-state">
                <p>No todos to display</p>
              </div>
            }
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatDividerModule,
  ],
  providers: [TodoStore],
})
export class TodoWithStoreComponent {
  protected readonly store = inject(TodoStore);

  newTodoTitle = '';

  addTodo() {
    if (!this.newTodoTitle.trim()) return;

    this.store.addTodo(this.newTodoTitle.trim());
  }
}
