import { Component } from '@angular/core';
import { BoardHeader } from './board-header/board-header';
import { FormsModule } from '@angular/forms';
import { FbTaskService } from '../services/fb-task-service';
import { ITask } from '../interfaces/i-task';
import {BoardCard} from './board-card/board-card';
import { CdkDropList, moveItemInArray, transferArrayItem, CdkDropListGroup, CdkDrag } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-board',
  imports: [BoardHeader, FormsModule, BoardCard, CdkDropList, CdkDropListGroup, CdkDrag],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {

  task: ITask = {} as ITask;
  currentTask: ITask = {} as ITask;
  defaultPriority: string = 'low';
  priorityOptions: string[] = ['low', 'medium', 'high'];
  columnIndex: number = 0;

  constructor(public fbTaskService: FbTaskService) {

    this.task = this.fbTaskService.newTask;
    this.columnIndex = 0;
    this.currentTask = {} as ITask;
    console.log(this.currentTask, this.columnIndex);
    this.fbTaskService.currentTask = this.currentTask

  }

  gettasks() {
    return this.fbTaskService.tasksArray.sort((a, b) => a.positionIndex - b.positionIndex);
  }

  getTaslCollumnOne() {
    return this.fbTaskService.tasksArray.filter(task => task.status === 'to-do').sort((a, b) => a.positionIndex - b.positionIndex);
  }
  getTaslCollumnTwo() {
    return this.fbTaskService.tasksArray.filter(task => task.status === 'in-progress').sort((a, b) => a.positionIndex - b.positionIndex);
  }
  getTaslCollumnThree() {
    return this.fbTaskService.tasksArray.filter(task => task.status === 'await-feedback').sort((a, b) => a.positionIndex - b.positionIndex);
  }
  getTaslCollumnFour() {
    return this.fbTaskService.tasksArray.filter(task => task.status === 'done').sort((a, b) => a.positionIndex - b.positionIndex);
  }


  async deleteTask(taskId?: string | undefined) {
    if (!taskId) return;

  }
}