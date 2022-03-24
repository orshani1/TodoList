import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Task {
  name: string;
  isUpdated: boolean;
  isVisble: boolean;
}

enum SortOptions {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  readonly TASK_KEYS = 'tasks';
  isUpdated: boolean = false;
  constructor() {
    this.tasks = [
      { name: 'task1', isUpdated: false, isVisble: false },
      { name: 'task3', isUpdated: false, isVisble: false },
    ];
  }
  sortEnum = SortOptions;
  sort = SortOptions.NONE;

  ngOnInit(): void {
    let savedTasks = localStorage.getItem(this.TASK_KEYS);
    if(savedTasks != null){
      this.tasks = JSON.parse(savedTasks);
    }

  }


  handleSubmit(addForm: NgForm) {
    let newTask = addForm.value.task;
    this.tasks.push(newTask);
    addForm.resetForm();
  }
  handleRemove(t: string) {
    this.tasks = this.tasks.filter((myTask) => myTask.name != t);
  }
  handleUpdate(t: string) {
    this.isUpdated = !this.isUpdated;
    let updatedName = this.tasks.filter((s) => {
      s.name == t;
    })[0];
    console.log(updatedName);
  }
  updateTask(task: string): void {


  }
  handleSort(sortDirection: SortOptions):void {
    
    this.sort = sortDirection;
    switch (sortDirection) {
      case SortOptions.ASC:
        this.tasks = this.tasks.sort((a, b) => {
          let aLower = a.name.toLowerCase();
          let bLower = b.name.toLowerCase();
          if (aLower < bLower) {
            return -1;
          }
          if (aLower > bLower) {
            return 1;
          }
          return 0;
        });
        break;
      case SortOptions.DESC:
        this.tasks = this.tasks.sort((a, b) => {
          let aLower = a.name.toLowerCase();
          let bLower = b.name.toLowerCase();
          if (aLower < bLower) {
            return 1;
          }
          if (aLower > bLower) {
            return -1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
  }
  handleSave():void{
    localStorage.setItem(this.TASK_KEYS,JSON.stringify(this.tasks));
  }
  handleSearch(v:string){
   
    this.tasks.map( (task) => {
      
      task.isVisble = (task.name.includes(v));
    });
  }
}
