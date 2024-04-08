import {Component, OnInit} from '@angular/core';
import {WorkerService} from '../workers.service';
import {Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {CommonModule, formatDate} from '@angular/common';
import {RoleName} from '../../models/RoleName.model';
import {RolesNameService} from '../roles-name.service';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-worker',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, // Use the desired locale
  ],
  templateUrl: './add-worker.component.html',
  styleUrl: './add-worker.component.scss',
})
export class AddWorkerComponent implements OnInit {
  genderOptions = [
    {value: true, label: 'זכר'},
    {value: false, label: 'נקבה'},
  ];
  addWorkerForm!: FormGroup;
  rolesName!: RoleName[];
  rolesNameDisplay!: RoleName[];
  constructor(
    private workerService: WorkerService,
    private roleNameService: RolesNameService,
    private router :Router,
    private route:ActivatedRoute,
    public dialogRef: MatDialogRef<AddWorkerComponent>,
    private fb: FormBuilder,
  ) {
    this.addWorkerForm = this.fb.group({
      workerId: [
        '',
        [Validators.required,Validators.pattern("^[0-9]{9}$")],
      ],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      start_of_work_date: [Validators.required],
      gender: [Validators.required],
      roles: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.roleNameService.getRolesName().subscribe({
      next: (res) => {this.rolesName = res;
      this.rolesNameDisplay=res},error:(res)=>this.toLogin()
    });
  }
  toLogin(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  dateAfterStartValidator() {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const entryDate = new Date(control.value);
        const startDate = new Date(
          this.addWorkerForm.get('start_of_work_date')?.value,
        );

        entryDate.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);

        if (entryDate < startDate) {
          resolve({dateAfterStart: true});
        } else {
          resolve(null);
        }
      });
    };
  }
  get roles() {
    return this.addWorkerForm.get('roles') as FormArray;
  }
  rolesNamechange(roleNameId: number, i: number): boolean {
    let selectedRoleIds = this.addWorkerForm.value.roles
        .map((role: any) => role.roleNameId);
    
    console.log(this.addWorkerForm.value.roles);
    console.log(selectedRoleIds);
    console.log(selectedRoleIds.includes(roleNameId) && selectedRoleIds.indexOf(roleNameId) != i);
    
    return selectedRoleIds.includes(roleNameId) && selectedRoleIds.indexOf(roleNameId) != i;
}

  onSubmit() {
    if (this.addWorkerForm.valid) {
      // Handle form submission logic here
      console.log(this.addWorkerForm.value);
      this.workerService.postWorker(this.addWorkerForm.value).subscribe({
        next: (res) => {
          this.closeDialog(),
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'the worker added succesfuly',
              showConfirmButton: false,
              timer: 1500,
            }),
            console.log('postSucsses');
        },
        error: (err) => {
          console.log('eror409');
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'this worker already exist',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      // Mark form fields as touched to display validation errors
      this.addWorkerForm.markAllAsTouched();
    } // debugger;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  removeRole(index: number) {
    const rolesArray = this.addWorkerForm.get('roles') as FormArray;
    rolesArray.removeAt(index);
  }
  addRole() {
    const role = this.fb.group({
      roleNameId: ['', Validators.required],
      date_of_entry_into_office: [new Date(), [Validators.required]],
      Managerial: [false, Validators.required],
    });
    const rolesFormGroup = this.addWorkerForm.get('roles') as FormArray;
    rolesFormGroup.push(role);

    const lastIndex = rolesFormGroup.length - 1;
    rolesFormGroup
      .at(lastIndex)
      .get('date_of_entry_into_office')
      ?.setAsyncValidators(this.dateAfterStartValidator());
    console.log(this.addWorkerForm.value);
  }
}
