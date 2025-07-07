import { Component, inject } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../share/dialog/confirm-dialog/confirm-dialog.component';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  #taskService = inject(TaskService);
  #router = inject(Router);
  dialog = inject(MatDialog);
  tasks = this.#taskService.filteredTasks;

  deleteTask(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.#taskService.deleteTask(id);
      }
    });
  }

  toggleTaskStatus(id: number) {
    this.#taskService.toggleTaskStatus(id);
  }
  viewDetails({ id, event }: { id: number; event: Event }) {
    event.stopPropagation();
    this.#router.navigate(['/tasks', id]);
  }
}
