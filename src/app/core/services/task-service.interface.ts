import { Signal } from '@angular/core';
import { Task } from '../models/task.model';

export interface ITaskService {
  filteredTasks: Signal<Task[]>;

  getTasks(): Signal<Task[]>;
  filterById(id: number | null): void;
  addTask(task: Omit<Task, 'id' | 'status'>): void;
  deleteTask(id: number): void;
  getTaskById(id: number): Task | undefined;
  toggleTaskStatus(id: number): void;
}
