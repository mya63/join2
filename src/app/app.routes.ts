import { Routes } from '@angular/router';
import { crud } from './crud/crud';
import { Contacts } from './contacts/contacts';
import { Login } from './login/login';
import { SignUp } from './login/sign-up/sign-up';
import { Intro } from './login/intro/intro';
import { AppShell } from './shared/layout/app-shell/app-shell';
import { LegalNotice } from './legal/legal-notice/legal-notice';
import { PrivacyPolicy } from './legal/privacy-policy/privacy-policy';

export const routes: Routes = [
  { path: '', component: Intro },

  { path: 'login', component: Login },
  { path: 'sign-up', component: SignUp },


  {
    path: '',
    component: AppShell,
    children: [
      { path: '', redirectTo: 'Contacts', pathMatch: 'full' },
      { path: 'summary', redirectTo: 'contacts', pathMatch: 'full' },
      { path: 'contacts', component: Contacts },
      { path: 'board', component: crud },
      { path: 'crud', component: crud },

      { path: 'legal-notice', component: LegalNotice },
      { path: 'privacy-policy', component: PrivacyPolicy },

      // { path: 'addc', component: AddContactComponent },
    ],
  },
];
