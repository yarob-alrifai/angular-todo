import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [TitleCasePipe, NgClass, MatCheckboxModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() viewDetails = new EventEmitter<{ id: number; event: Event }>();
  @Output() delete = new EventEmitter<number>();
  @Output() toggleStatus = new EventEmitter<number>();

  onViewDetails(event: Event) {
    this.viewDetails.emit({ id: this.task.id, event });
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  onToggleStatus() {
    this.toggleStatus.emit(this.task.id);
  }
}
