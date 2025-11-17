import { Routes } from '@angular/router';
import { crud } from './crud/crud';
import { Tasktest } from './tasktest/tasktest';
import { Contacts } from './contacts/contacts';
import { Board } from './board/board';
import { BoardCard } from './board/board-card/board-card';

export const routes: Routes = [
   { path: '', component: Board },
   { path: 'summary', component: BoardCard },
   // { path: 'summary', redirectTo: '', pathMatch: 'full' },
   { path: 'contacts', component: Contacts },
   { path: 'board', component: Board },
   { path: 'add-task', component: Tasktest },
   // { path: 'addc', component: AddContactComponent },


];
