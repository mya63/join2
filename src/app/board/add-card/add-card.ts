import { Component, input, output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FbService } from '../../services/fb-service';
import { FbTaskService } from '../../services/fb-task-service';
import { ITask } from '../../interfaces/i-task';
import { IContact } from '../../interfaces/i-contact';
import { user } from '@angular/fire/auth';
import { Value } from '@angular/fire/remote-config';
import { inputNames } from '@angular/cdk/schematics';


@Component({
  selector: 'app-add-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-card.html',
  styleUrl: './add-card.scss',
})
export class AddCard implements OnInit {
  selectedColumn = input<string>('');
  closeOverlay = output<void>();
  onClose(): void {
    this.closeOverlay.emit();
  }

  create() {
    this.addTask(this.task);
    this.onClose();
  }

  injectedFbService = inject(FbService);
  FbService: FbService = this.injectedFbService;

  injectedfbTaskService = inject(FbTaskService);
  fbTaskService: FbTaskService = this.injectedfbTaskService;

  task: ITask = {} as ITask;
  currentTask: ITask = {} as ITask;
  showAssignDropdown = { task: false, currentTask: false };
  showCategoryDropdown = { task: false, currentTask: false };
  filterAssignedUsers: string = '';
  currentCategory: string = 'Select task category';
  categoryOptions: { category: number, categoryProperties: { name: string; color: string }[] } =
    {
      category: -1,
      categoryProperties: [
        { name: 'User Story', color: '#0038FF' },
        { name: 'Technical Task', color: '#1FD7C1' },
      ]
    };
  subtask: { title: string; completed: boolean; onEdit: boolean } = { title: '', completed: false, onEdit: false };


  ngOnInit(): void {
    this.task = this.fbTaskService.newTask;
    this.currentTask = this.fbTaskService.newTask;
    this.task.status = this.getStatus(this.selectedColumn());
    this.task.category.categoryProperties[0].color = this.categoryOptions.categoryProperties[0].color;
    this.task.category.categoryProperties[0].name = this.categoryOptions.categoryProperties[0].name;
    this.task.subTasks = [];
    console.log(this.task);
  }

  getStatus(status: string): string {
    return status
  }

  addTask(newTask: ITask) {
    this.fbTaskService.createTask(newTask);
    this.task.assignTo = [];
    this.task.priority = 'medium';
    this.task.category.category = -1;
    this.task.subTasks = [];
  }

  whichPriority(priority: string): boolean {
    return this.task.priority === priority;
  }

  setPriority(priority: string): void {
    this.task.priority = priority;
    this.currentTask.priority = priority
  }




  getUserForTask() {
    return this.FbService.contactsArray.filter(user =>
      user.name.toLowerCase().includes(this.filterAssignedUsers.toLowerCase()) ||
      user.surname.toLowerCase().includes(this.filterAssignedUsers.toLowerCase()) ||
      user.email.toLowerCase().includes(this.filterAssignedUsers.toLowerCase())
    )
  }

  isUserAssigned(user: IContact, assignedUsers: IContact[]): boolean {
    if (!assignedUsers || !Array.isArray(assignedUsers)) {
      return false;
    }
    return assignedUsers.some(assignedUser =>
      assignedUser.id === user.id
    );
  }

  toggleUserAssignment(user: IContact, assignedUsers: IContact[]): void {
    if (!assignedUsers) {
      assignedUsers = [];
    }

    const index = assignedUsers.findIndex(assignedUser =>
      assignedUser.id === user.id
    );

    if (index > -1) {
      // User ist bereits zugewiesen, entfernen
      assignedUsers.splice(index, 1);
    } else {
      // User ist nicht zugewiesen, hinzufügen
      assignedUsers.push(user);
    }
  }

  toggleAssignDropdown(target: 'task' | 'currentTask'): void {
    this.showAssignDropdown[target] = !this.showAssignDropdown[target];
  }

  toggleCategoryDropdown(target: 'task' | 'currentTask'): void {
    this.showCategoryDropdown[target] = !this.showCategoryDropdown[target];
  }


  dataIsSet() {
    return (this.currentCategory != 'Select task category');
  }

  closeAssignDropdown(event: any) {
    //console.log(event.target.getAttribute('class'));
    if (event.target.getAttribute('class') != null) {
      if (!['', 'ng', 'fi', 'us', 'dr', 'ca', 'dN'].includes((event.target.getAttribute('class').slice(0, 2)))) {
        this.showAssignDropdown = { task: false, currentTask: false };
        this.showCategoryDropdown = { task: false, currentTask: false };
      }
    }
  }

  setCategory(categoryName: string): void {
    this.currentCategory = categoryName;
    const categoryIndex = this.categoryOptions.categoryProperties.findIndex(category => category.name === categoryName);
    if (categoryIndex !== -1) {
      this.task.category.category = 0;
      this.task.category.categoryProperties[0].color = this.categoryOptions.categoryProperties[categoryIndex].color;
      this.task.category.categoryProperties[0].name = this.categoryOptions.categoryProperties[categoryIndex].name;
      this.showCategoryDropdown.currentTask = false;
    }
  }

  addSubtask(myTask: ITask) {
    if (!myTask || this.subtask.title.trim() === '') {
      return;
    }
    myTask.subTasks.push({subtaskTitle: this.subtask.title, subtaskCompleted: false, onEdit: false });
    this.subtask = { title: '', completed: false, onEdit: false };
  }

  editSubtask(subtaskTitle: string, newTitle: string, myTask: ITask) {
    const subtask = myTask.subTasks.find(st => st.subtaskTitle === subtaskTitle);

    if (subtask) {
      subtask.subtaskTitle = newTitle;
      subtask.onEdit = false;
    }
  }

  deleteSubtask(subtaskTitle: string, myTask: ITask) {
    myTask.subTasks = myTask.subTasks.filter(st => st.subtaskTitle !== subtaskTitle);
    myTask.subTasks = [...myTask.subTasks];
  }


}