import { Routes } from '@angular/router';

import { TaskDetailsComponent } from './features/tasks/components/task-details/task-details.component';
import { TasksComponent } from './features/tasks/components/tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/:id', component: TaskDetailsComponent },
  { path: '**', redirectTo: '/tasks' }, 
];
