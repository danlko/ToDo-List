import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class Crud {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  getTasks() {
    return this.tasksSubject.asObservable();
  }

  addTask(taskName: string) {
    if (taskName.trim()) {
      const newTask: Task = {
        id: this.tasks.length + 1,
        name: taskName.trim()
      };
      this.tasks.push(newTask);
      this.tasksSubject.next([...this.tasks]);
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }

  editTask(id: number, newName: string) {
    if (newName.trim()) {
      this.tasks = this.tasks.map(task => 
        task.id === id ? { ...task, name: newName.trim() } : task
      );
      this.tasksSubject.next([...this.tasks]);
    }
  }
}