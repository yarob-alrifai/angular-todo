import { Component,  inject, computed } from '@angular/core';
import {  NgClass, TitleCasePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../core/services/task.service';
import { ConfirmDialogComponent } from '../../../../share/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
TitleCasePipe,
    NgClass,
    MatCheckboxModule,
    MatButtonModule,
    
  ],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {
  #taskService = inject(TaskService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #dialog = inject(MatDialog);

  taskId = Number(this.#route.snapshot.paramMap.get('id'));
  task = computed(() => this.#taskService.getTaskById(this.taskId));

  goBack() {
    this.#router.navigate(['/tasks']);
  }

  toggleTaskStatus(id: number) {
    this.#taskService.toggleTaskStatus(id);
  }

  deleteTask(id: number) {
    const dialogRef = this.#dialog.open(ConfirmDialogComponent, {
      width: '400px',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.#taskService.deleteTask(id);
        this.#router.navigate(['/tasks']);
      }
    });
  }
}
