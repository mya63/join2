import { Routes } from '@angular/router';
import { crud } from  './crud/crud';
import { Contacts } from './contacts/contacts';
import { Board } from './board/board';

export const routes: Routes = [
     { path: '', component: Contacts },
  { path: 'summary', redirectTo: '', pathMatch: 'full' },
  { path: 'contacts', component: Contacts },
  { path: 'board', component: crud },
  { path: 'crud', component: crud },
 // { path: 'addc', component: AddContactComponent },
  
 { path: 'sprint2demo', component: Board },

];
