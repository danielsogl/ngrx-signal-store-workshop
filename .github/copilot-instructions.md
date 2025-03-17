# Angular v19+ Development Standards and Best Practices

## Core Architecture Guidelines

We follow these core architectural patterns:

- Components, directives, and pipes are standalone by default (Angular v19+)
- Implement proper TypeScript types throughout the codebase
- Use strong typing with interfaces and models
- Follow the Single Responsibility Principle (SRP) in all components and services
- Keep files focused on one thing (Rule of One)
- Use Signals for reactive state management
- Utilize dependency injection for service management
- Use Deferrable Views for lazy-loading components
- Implement the Directive Composition API for component behavior
- Use route-level lazy loading with loadComponent

## Angular Style Guide Compliance

Following the Angular Style Guide:

- Limit files to 400 lines of code
- Define one thing (component, service, etc.) per file
- Follow consistent naming conventions for all symbols
- Use feature-based folder structure
- Extract templates and styles to their own files for components
- Properly decorate input and output properties
- Follow proper component selector naming conventions with custom prefixes

## Input Signals

For component inputs, follow these guidelines:

- Use the modern signal-based `input()` function instead of `@Input()` decorator:

  ```typescript
  // Preferred
  value = input(0);  // Creates InputSignal

  // Instead of
  @Input() value = 0;
  ```

- For required inputs, use `input.required()`:
  ```typescript
  value = input.required();
  ```
- Apply input transformations when needed:
  ```typescript
  disabled = input(false, { transform: booleanAttribute });
  value = input(0, { transform: numberAttribute });
  ```
- For two-way binding, use model inputs:

  ```typescript
  value = model(0);  // Creates a model input with change propagation

  // Update model values with .set() or .update()
  increment() {
    this.value.update(v =&gt; v + 1);
  }
  ```

- Use input aliases when necessary:
  ```typescript
  value = input(0, { alias: "sliderValue" });
  ```

## Component Development

When creating components:

- Use consistent naming pattern: feature.type.ts (e.g., hero-list.component.ts)
- Extract templates to separate .html files for any non-trivial templates
- Extract styles to separate .css/.scss files
- Use signal-based inputs with `input()` function
- Use model inputs with `model()` function for two-way binding
- Implement lifecycle hook interfaces (OnInit, OnDestroy, etc.)
- Keep components as elements (`selector: 'app-hero-detail'`)
- Delegate complex component logic to services
- Initialize inputs properly when needed (default values or required)
- Use @defer for lazy loading heavy components or features
- Implement proper error boundaries with try-catch blocks
- Use control flow syntax (@if, @for, @switch) instead of structural directives
- Implement proper loading and error states
- Use computed() for derived state calculations

## Styling Standards

Our styling conventions:

- Use component-specific styles with proper encapsulation
- Follow BEM methodology for CSS class naming when not using Angular Material
- Use Angular Material or other component libraries consistently
- Implement proper theming and color systems
- Support dark mode where appropriate
- Follow accessibility (a11y) standards in all components

## Services and Dependency Injection

For services and DI:

- Use `@Injectable()` decorator with `providedIn: 'root'` for singleton services
- Make data services responsible for API calls and data operations
- Implement proper error handling in services
- Follow the Angular DI hierarchy appropriately
- Use interfaces to define service contracts
- Keep services focused on specific responsibilities

## Directives and Pipes

When creating directives and pipes:

- Use attribute directives for presentation logic without templates
- Use the `host` property for host bindings and listeners instead of decorators:
  ```typescript
  @Directive({
    standalone: true,
    selector: '[appHighlight]',
    host: {
      // Host bindings
      '[class.highlighted]': 'isHighlighted',
      '[style.color]': 'highlightColor',

      // Host listeners
      '(click)': 'onClick($event)',
      '(mouseenter)': 'onMouseEnter()',
      '(mouseleave)': 'onMouseLeave()',

      // Static properties
      'role': 'button',
      '[attr.aria-label]': 'ariaLabel'
    }
  })
  ```
- Use custom prefixes for directive selectors
- Make pipes pure when possible for better performance
- Follow naming conventions for pipes (camelCase)

## State Management

For state management:

- Use Signals as the primary state management solution
- Use signal inputs with `input()` for component inputs
- Use model inputs with `model()` for two-way binding
- Use writable signals with `signal()` for local component state
- Use computed signals with `computed()` for derived state
- Use effect() for handling side effects
- Implement proper error handling in signal computations
- Use toSignal() and toObservable() for RxJS interop
- Use SignalStore (@ngrx/signals) for complex state management
- Implement proper cleanup in effects using cleanup callbacks
- Use signal-based forms with FormGroup
- Properly unsubscribe from Observables in ngOnDestroy
- Use OnPush change detection strategy for better performance

## Control Flow and Deferrable Views

For template control flow and lazy loading:

- Use new control flow syntax instead of structural directives:

  ```typescript
  @if (condition) {
    // content
  } @else {
    // else content
  }

  @for (item of items; track item.id) {
    // content
  }

  @switch (value) {
    @case (caseA) {
      // content
    }
    @case (caseB) {
      // content
    }
    @default {
      // content
    }
  }
  ```

- Use @defer for lazy loading:

  ```typescript
  @defer {

  } @loading {

  } @error {

  } @placeholder {

  }
  ```

- Use defer triggers appropriately:

  ```typescript
  @defer (on viewport) // Load when visible
  @defer (on idle) // Load during idle time
  @defer (on immediate) // Load ASAP after priority content
  @defer (on hover) // Load on hover
  @defer (on interaction) // Load on any interaction
  ```

- Implement proper loading states for deferred content
- Use placeholder content for better UX
- Handle errors gracefully in deferred content
- Consider using prefetching for critical components
- Implement proper retry strategies for failed loads

## Performance Requirements

Performance optimization rules:

- Use OnPush change detection strategy for performance-critical components
- Implement proper change detection strategies
- Use trackBy function with ngFor for better rendering performance
- Optimize bundle size with lazy loading modules/components
- Follow Angular's performance best practices
- Use proper image optimization strategies

## Testing Standards

Testing requirements:

- Write unit tests for components and services
- Create integration tests for component interactions
- Implement proper testing patterns for services and components
- Use TestBed and ComponentFixture for component testing
- Properly mock dependencies in unit tests
- Follow Angular's testing best practices

## API and Data Handling

For API integration:

- Use HttpClient for all API requests
- Implement proper error handling for HTTP requests
- Use interceptors for common HTTP request/response handling
- Implement proper retry and backoff strategies
- Follow proper data transformation patterns
- Use proper typing for API responses
