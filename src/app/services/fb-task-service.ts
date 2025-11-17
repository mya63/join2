import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, orderBy, query, where } from '@angular/fire/firestore';
import { addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { ITask } from '../interfaces/i-task';
import { FbService } from './fb-service';


@Injectable({
  providedIn: 'root',
})
export class FbTaskService {
  private db = inject(Firestore);
  private fbService = inject(FbService);

  myTasks;
  task: ITask;
  newTask: ITask;
  currentTask: ITask;
  tasksArray: ITask[];

  tasksCollection = collection(this.db, 'tasks');
  tasksCollectionFiltered = query(this.tasksCollection, where('ownerId', '==', this.fbService.getCurrentUserId()));

  constructor() {

    this.task = {} as ITask;
    this.currentTask = {} as ITask;
    this.tasksArray = [];
    this.newTask = {
      createDate: new Date().toISOString(),
      ownerId: this.getCurrentUserId(),
      completed: this.task.completed || false,
      dueDate: this.task.dueDate || '',
      status: this.task.status || 'to-do',
      positionIndex: this.task.positionIndex || 0,
      category: this.task.category || { name: 'New Task Category', color: '#FFFFFF' },
      title: this.task.title || 'New Task Title',
      description: this.task.description || 'New Task Description',
      assignTo: this.task.assignTo || [],
      priority: this.task.priority || 'low',
      subTasks: this.task.subTasks || [],
      progress: this.task.progress || 0,
    };

    this.myTasks = onSnapshot(this.tasksCollectionFiltered, (snapshot) => {
      this.tasksArray = [];
      snapshot.forEach((element) => {
        this.tasksArray.push({ dbid: element.id, ...element.data() } as ITask);
      });
      this.tasksArray = this.tasksArray.sort((a, b) => (a.positionIndex ?? 0) - (b.positionIndex ?? 0));
      console.log(this.tasksArray);
    });

  }

  async addTask(task: ITask) {
    await addDoc(this.tasksCollection, task);
  }

  async deleteTask(taskId?: string | undefined) {
    if (!taskId) return;
    const taskDoc = doc(this.db, 'tasks', taskId);
    await deleteDoc(taskDoc);
  }

  async updateTask(taskId?: string, updatedData?: Partial<ITask>) {
    if (!taskId || !updatedData) return;
    console.log(updatedData);
    const taskDoc = doc(this.tasksCollection, taskId);


    await updateDoc(taskDoc, updatedData);
  }







  getCurrentUserId(): string {
    return this.fbService.getCurrentUserId();
  }

  onDestroy() {
    this.myTasks();
  }

}