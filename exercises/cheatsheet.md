# NgRx Signal Store Cheat Sheet

This document provides quick reference snippets and patterns for working with NgRx Signal Store.

## Basic Store Structure

```typescript
export const MyStore = signalStore(
  // Optional: Make injectable at root (or omit for component-level provision)
  { providedIn: "root" },

  // Add state
  withState({
    /* initial state */
  }),

  // Add computed values
  withComputed(
    (
      {
        /* state references */
      },
    ) => ({
      /* computed properties */
    }),
  ),

  // Add methods
  withMethods((store) => ({
    /* methods */
  })),
);
```

## State Definition

```typescript
// Define state interface
export interface MyState {
  items: Item[];
  isLoading: boolean;
  filter: string;
}

// Create initial state
const initialState: MyState = {
  items: [],
  isLoading: false,
  filter: "",
};

// Use in store
withState(initialState);
```

## Computed Properties

```typescript
withComputed(({ items, filter }) => ({
  // Simple computed property
  count: computed(() => items().length),

  // Filtered list
  filteredItems: computed(() => {
    const filterText = filter().toLowerCase();
    return items().filter((item) => item.name.toLowerCase().includes(filterText));
  }),

  // Derived from another computed
  hasResults: computed(() => filteredItems().length > 0),
}));
```

## Methods for Updating State

```typescript
withMethods((store) => ({
  // Add item
  addItem(item: Item): void {
    patchState(store, (state) => ({
      items: [...state.items, item],
    }));
  },

  // Update by reference
  updateItem(updatedItem: Item): void {
    patchState(store, (state) => ({
      items: state.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    }));
  },

  // Remove item
  removeItem(id: string): void {
    patchState(store, (state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  // Direct state update (single property)
  setLoading(isLoading: boolean): void {
    patchState(store, { isLoading });
  },

  // Update nested state
  updateFilter(newFilter: string): void {
    patchState(store, { filter: newFilter });
  },
}));
```

## Async Operations

```typescript
withMethods((store, service = inject(MyService)) => ({
  // Using async/await
  async loadItems(): Promise<void> {
    patchState(store, { isLoading: true });

    try {
      const items = await service.getItems().toPromise();
      patchState(store, { items, isLoading: false });
    } catch (error) {
      console.error("Failed to load items", error);
      patchState(store, { isLoading: false });
    }
  },
}));
```

## RxMethod for Reactive Operations

```typescript
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";

withMethods((store, service = inject(MyService)) => ({
  search: rxMethod<string>(
    pipe(
      // Common RxJS operators
      debounceTime(300),
      distinctUntilChanged(),

      // Set loading state
      tap(() => patchState(store, { isLoading: true })),

      // Make API call
      switchMap((query) =>
        service.searchItems(query).pipe(
          // Handle response
          tapResponse({
            next: (items) =>
              patchState(store, {
                items,
                isLoading: false,
              }),
            error: (error) => {
              console.error("Search failed", error);
              patchState(store, { isLoading: false });
            },
          }),
        ),
      ),
    ),
  ),
}));
```

## Providing and Injecting Store

```typescript
// Global store (provided in root)
export const GlobalStore = signalStore(
  { providedIn: "root" },
  // ... store implementation
);

// Component-scoped store (provided at component level)
export const LocalStore =
  signalStore();
  // ... store implementation without providedIn

@Component({
  // ...
  providers: [LocalStore], // Provide at component level
})
export class MyComponent {
  // Inject the store
  private store = inject(LocalStore); // or GlobalStore

  // Access state
  items = this.store.items;

  // Call methods
  addItem(item: Item) {
    this.store.addItem(item);
  }
}
```

## Using Store in Templates

```html
<!-- Using signals directly in templates -->
<h1>Items ({{ store.count() }})</h1>

<!-- Conditional rendering -->
@if (store.isLoading()) {
<div>Loading...</div>
} @else if (store.hasResults()) {
<ul>
  @for (item of store.filteredItems(); track item.id) {
  <li>{{ item.name }}</li>
  }
</ul>
} @else {
<p>No results found</p>
}

<!-- Binding to input -->
<input [value]="store.filter()" (input)="store.updateFilter($event.target.value)" />

<!-- Calling methods -->
<button (click)="store.loadItems()">Refresh</button>
```

## Dependency Injection in Store

```typescript
withMethods(
  (
    store,
    // Inject dependencies
    service = inject(MyService),
    router = inject(Router),
    dialog = inject(MatDialog),
  ) => ({
    async saveItem(item: Item): Promise<void> {
      try {
        await service.saveItem(item);
        dialog.open(SuccessDialogComponent);
        router.navigate(["/items"]);
      } catch (error) {
        console.error("Failed to save", error);
      }
    },
  }),
);
```

## Common Patterns

### Loading, Error, and Success States

```typescript
// State definition
interface MyState {
  items: Item[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

// Initial state
const initialState: MyState = {
  items: [],
  status: "idle",
  error: null,
};

// Methods
withMethods((store, service = inject(MyService)) => ({
  async loadItems(): Promise<void> {
    patchState(store, {
      status: "loading",
      error: null,
    });

    try {
      const items = await service.getItems();
      patchState(store, {
        items,
        status: "success",
      });
    } catch (error) {
      patchState(store, {
        status: "error",
        error: error.message || "Failed to load items",
      });
    }
  },
}));
```

### Storing Form State

```typescript
// State definition
interface FormState {
  values: {
    name: string;
    email: string;
    // other form fields
  };
  isDirty: boolean;
  isValid: boolean;
}

// Methods
withMethods((store) => ({
  updateField(field: string, value: string): void {
    patchState(store, (state) => ({
      values: {
        ...state.values,
        [field]: value,
      },
      isDirty: true,
    }));
  },

  resetForm(): void {
    patchState(store, {
      values: { name: "", email: "" },
      isDirty: false,
      isValid: false,
    });
  },
}));
```
