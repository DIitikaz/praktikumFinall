import {Component} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import {WorkerService} from '../workers.service';
import {Worker} from '../../models/worker.model';
import {MatDialog} from '@angular/material/dialog';
import {EditWorkerComponent} from '../edit-worker/edit-worker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {identity} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AddWorkerComponent} from '../add-worker/add-worker.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';
import * as ExcelJS from 'exceljs';
import {saveAs} from 'file-saver';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-worker-data',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    DecimalPipe,
    MatFormFieldModule,
    FormsModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    MatIconModule,
    CommonModule,
    MatDatepickerModule,
  ],
  templateUrl: './worker-data.component.html',
  styleUrl: './worker-data.component.scss',
})
export class WorkerDataComponent {
  page = 1;
  pageSize = 10;
  workers: Worker[] = [];
  workersDisplay: Worker[] = [];
  workersFilter: Worker[] = [];
  collectionSize = this.workers.length;
  isHovered: boolean[] = [];

  constructor(
    private workerService: WorkerService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.restartWorkers();
  }
  restartWorkers() {
    this.workerService.getWorkers().subscribe({
      next: (res) => {
        this.workers = res;
        this.collectionSize = res.length;
        this.workersDisplay = res;
        this.workersFilter = res;
        this.refreshWorkers();
      },
      error:(res)=>this.toLogin()
    });
  }
  toLogin(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  
  addWorker() {
    const dialogRef = this.dialog.open(AddWorkerComponent, {
      width: '695px',
      height: '780px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.restartWorkers();
    });
  }
  deleteWorker(worker: Worker) {
    this.workerService.delateWorker(worker.id).subscribe({
      next: (res) => {
        console.log('deletework');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'this worker erase succesfuly',
          showConfirmButton: false,
          timer: 1500,
        });
        this.restartWorkers();
      },
      error: (err) => {
        console.log('delete not work');
      },
    });
  }

  editWorker(worker: Worker) {
    const dialogRef = this.dialog.open(EditWorkerComponent, {
      data: {id: worker.id},
      width: '695px',
      height: '780px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.restartWorkers();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.workersFilter = this.workers.filter(
      (x) =>
        x.firstName.includes(filterValue) ||
        x.lastName.includes(filterValue) ||
        x.workerId.includes(filterValue),
    );

    this.collectionSize = this.workersFilter.length;
    this.page = 1;
    this.refreshWorkers();
  }
  refreshWorkers() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.workersFilter.length,
    );
    this.workersDisplay = this.workersFilter.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.refreshWorkers();
  }

  showIcons(index: number) {
    this.isHovered[index] = true;
  }

  hideIcons(index: number) {
    this.isHovered[index] = false;
  }
  exportToExcel(): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Workers Data');
    worksheet.addRow(['#', 'First Name', 'Last Name', 'Start Work Date']);
    this.workersDisplay.forEach((worker, index) => {
      worksheet.addRow([
        index + 1,
        worker.firstName,
        worker.lastName,
        worker.start_of_work_date,
      ]);
    });
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'workers_data.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
