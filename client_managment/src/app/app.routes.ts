import {Routes} from '@angular/router';
import {EditWorkerComponent} from './componnents/edit-worker/edit-worker.component';
import {WorkerDataComponent} from './componnents/worker-data/worker-data.component';
import {LoginComponent} from './componnents/login/login.component';
import { loginGuard } from './login.guard';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'home',
    component:WorkerDataComponent ,canActivate: [loginGuard],
  },
];
