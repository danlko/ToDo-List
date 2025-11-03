import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ToDoList {
  title: number;
  task: string;
  completed: boolean;
} 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  task="meeting at 10pm";
  taskList:{id:number,name:string}[] = []

  editTaskId:number|null = null;
  editedTaskName:string="";

  addTask(){
    this.taskList.push({id:this.taskList.length+1,name:this.task.trim()});
    this.task="";
  }

  deleteTask(id:number){
    this.taskList = this.taskList.filter(task=>task.id!==id);
  }

  editTask(id:number,newName:string){
    this.taskList = this.taskList.map(task=>{
      if(task.id===id){
        return {...task,name:newName};
      }
      return task;
    });
  }

  startEditTask(id:number,name:string){
    this.editTaskId = id;
    this.editedTaskName = name;
  }

  cancelEdit(){
    this.editTaskId = null;
    this.editedTaskName = "";
  }

  saveEdit(){
    if (this.editTaskId !== null && this.editedTaskName.trim() !== "") {
      this.editTask(this.editTaskId, this.editedTaskName.trim());
    }
    this.cancelEdit();
  }
}