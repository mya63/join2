import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FbTaskService } from '../services/fb-task-service';
import { ITask } from '../interfaces/i-task';


@Component({
  selector: 'app-tasktest',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasktest.html',
  styleUrl: './tasktest.scss',
})
export class Tasktest {

  task: ITask = {} as ITask;
  defaultPriority: string = 'low';
  priorityOptions: string[] = ['low', 'medium', 'high'];

  constructor(public fbTaskService: FbTaskService) {}


gettasks() {
  return this.fbTaskService.tasksArray;
}

addTask() {
  const newTask: ITask = {
    positionIndex: 0,
    createDate: new Date().toISOString(),
    ownerId: this.fbTaskService.getCurrentUserId(),
    title: this.task.title,
    description: this.task.description,
    dueDate: this.task.dueDate,
    completed: this.task.completed,
    priority: this.task.priority || 'low',
    assignTo: this.task.assignTo,
    category: this.task.category,
    subTasks: [],
    status: 'to-do'
  };
  this.fbTaskService.addTask(newTask);
}


}
