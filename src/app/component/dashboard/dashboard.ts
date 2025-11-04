import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Crud } from '../../service/crud';
import { Task } from '../../model/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  newTask = '';
  tasks: Observable<Task[]>;
  editTaskId: number | null = null;
  editedTaskName = '';

  constructor(private crudService: Crud) {
    this.tasks = this.crudService.getTasks();
  }

  ngOnInit() {}

  addTask() {
    this.crudService.addTask(this.newTask);
    this.newTask = '';
  }

  deleteTask(id: number) {
    this.crudService.deleteTask(id);
  }

  startEdit(id: number, name: string) {
    this.editTaskId = id;
    this.editedTaskName = name;
  }

  saveEdit() {
    if (this.editTaskId && this.editedTaskName) {
      this.crudService.editTask(this.editTaskId, this.editedTaskName);
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editTaskId = null;
    this.editedTaskName = '';
  }
}