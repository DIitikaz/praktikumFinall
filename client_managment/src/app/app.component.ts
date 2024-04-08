import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {WorkerDataComponent} from './componnents/worker-data/worker-data.component';
import {MatIconModule} from '@angular/material/icon';
import {LoginComponent} from './componnents/login/login.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    WorkerDataComponent,
    MatIconModule,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client_managment';
}
