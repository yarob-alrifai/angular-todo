import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Отправить предложение по проекту',
      description:
        'Отправить финальный вариант предложения по IIoT научному руководителю.',
      status: 'не выполнена',
    },
    {
      id: 2,
      title: 'Изучить научные статьи',
      description:
        'Просмотреть последние публикации по обнаружению отказов оборудования.',
      status: 'выполнена',
    },
    {
      id: 3,
      title: 'Подготовить презентацию',
      status: 'не выполнена',
    },
    {
      id: 4,
      title: 'Исправить ошибку в модуле датчиков',
      description: 'Решить проблему с нестабильными показаниями температуры.',
      status: 'выполнена',
    },
    {
      id: 5,
      title: 'Назначить встречу с научным руководителем',
      status: 'не выполнена',
    },
  ]);

  private filterId = signal<number | null>(null);
  filteredTasks = signal<Task[]>(this.tasks());

  getTasks() {
    return this.tasks.asReadonly();
  }

  filterById(id: number | null) {
    this.filterId.set(id);
    if (id === null) {
      this.filteredTasks.set(this.tasks());
    } else {
      const task = this.getTaskById(id);
      this.filteredTasks.set(task ? [task] : []);
    }
  }

  addTask(task: Omit<Task, 'id' | 'status'>) {
    const maxId =
      this.tasks().length > 0 ? Math.max(...this.tasks().map((t) => t.id)) : 0;
    const newTask: Task = {
      id: maxId + 1,
      ...task,
      status: 'не выполнена',
    };
    this.tasks.update((tasks) => [...tasks, newTask]);

    if (!this.filterId() || newTask.id === this.filterId()) {
      this.filteredTasks.update((tasks) => [...tasks, newTask]);
    }
  }

  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));

    this.filteredTasks.update((tasks) =>
      tasks.filter((task) => task.id !== id)
    );
  }

  getTaskById(id: number) {
    return this.tasks().find((task) => task.id === id);
  }

  toggleTaskStatus(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'не выполнена' ? 'выполнена' : 'не выполнена',
            }
          : task
      )
    );

    this.filteredTasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'не выполнена' ? 'выполнена' : 'не выполнена',
            }
          : task
      )
    );
  }
}
