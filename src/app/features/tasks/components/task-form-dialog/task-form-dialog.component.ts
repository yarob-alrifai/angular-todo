import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../../core/services/task.service';

@Component({
  selector: 'app-task-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss'],
})
export class TaskFormDialogComponent {
  #taskService = inject(TaskService);
  #dialogRef = inject(MatDialogRef<TaskFormDialogComponent>);

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  onSubmit() {
    if (this.taskForm.valid) {
      this.#taskService.addTask(
        this.taskForm.value as { title: string; description?: string }
      );
      this.#dialogRef.close(true);
    }
  }

  onCancel() {
    this.#dialogRef.close();
  }
}
