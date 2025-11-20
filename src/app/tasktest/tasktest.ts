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
  currentTask: ITask = {} as ITask;
  defaultPriority: string = 'low';
  priorityOptions: string[] = ['low', 'medium', 'high'];
  statusOptions: string[] = ['to-do', 'in-progress', 'await-feedback', 'done'];
  categoryOptions: { category: number, categoryProperties: { name: string; color: string }[] } =
    {
      category: 0,
      categoryProperties: [
        { name: 'User Story', color: 'blue' },
        { name: 'Technical Task', color: 'green' },
      ]
    };
  columnIndex: number = 0;

  constructor(public fbTaskService: FbTaskService) {

    this.task = this.fbTaskService.newTask;
    this.columnIndex = 0;
    this.currentTask = this.task;
    console.log(this.currentTask, this.columnIndex);

    this.fbTaskService.currentTask = this.currentTask
  }

  gettasks() {
    return this.fbTaskService.tasksArray.sort((a, b) => a.positionIndex - b.positionIndex);
  }

  addTask(newTask: ITask) {
    newTask.category.categoryProperties[0].color = this.categoryOptions.categoryProperties[newTask.category.category].color;
    newTask.category.categoryProperties[0].name = this.categoryOptions.categoryProperties[newTask.category.category].name;
    newTask.category.category = 0;
    newTask.createDate = new Date().toISOString();
    this.fbTaskService.addTask(newTask);
    this.task = this.fbTaskService.newTask;
  }

  async deleteTask(taskId?: string) {
    await this.fbTaskService.deleteTask(taskId);
  }

  async updateTask() {
    await this.fbTaskService.updateTask(this.currentTask.dbid, this.currentTask);
  }


  nextTask() {
    if (!this.fbTaskService.tasksArray.length) return;
    this.columnIndex = (this.columnIndex + 1) % this.fbTaskService.tasksArray.length;
    this.currentTask = this.fbTaskService.tasksArray[this.columnIndex];
    this.fbTaskService.currentTask = this.currentTask;
    console.log(this.currentTask, this.columnIndex);

  }


}
