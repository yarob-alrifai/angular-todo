import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../../core/services/task.service';
import { TaskFormDialogComponent } from './task-form-dialog/task-form-dialog.component';

import { TaskFilterComponent } from './task-filter/task-filter.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [

    TaskFilterComponent,
    TasksListComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  #taskService = inject(TaskService);
  dialog = inject(MatDialog);

  onAddTask() {
    this.dialog.open(TaskFormDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
    });
  }

  onFilterChange(filterValue: number | null) {
    this.#taskService.filterById(filterValue);
  }
}
