import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type Prio = 'urgent' | 'medium' | 'low';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.scss'],
})
export class AddTask {
  form: { priority: Prio } = { priority: 'medium' };
}
