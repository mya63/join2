import { Routes } from '@angular/router';
import { crud } from './crud/crud';
import { Contacts } from './contacts/contacts';
import { Board } from './board/board';
import { BoardCard } from './board/board-card/board-card';
import { AddTask } from './board/add-task/add-task';

export const routes: Routes = [
  { path: '', component: Contacts },
  { path: 'summary', redirectTo: '', pathMatch: 'full' },
  { path: 'contacts', component: Contacts },
  { path: 'crud', component: crud },

  // SPRINT 2 DEMO
  { path: 'board', component: Board },
  { path: 'sprint2-demo-card', component: BoardCard },
  { path: 'sprint2-demo-add', component: AddTask },
];
