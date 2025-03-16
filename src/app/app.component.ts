import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
