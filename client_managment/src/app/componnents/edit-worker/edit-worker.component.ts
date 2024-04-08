import {Component, OnInit} from '@angular/core';
import {FullWorker} from '../../models/fullWorker.model';
import {ActivatedRoute, Router} from '@angular/router';
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
@Component({
  selector: 'app-edit-worker',
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
  templateUrl: './edit-worker.component.html',
  styleUrl: './edit-worker.component.scss',
})
export class EditWorkerComponent implements OnInit {
  genderOptions = [
    {value: true, label: 'Male'},
    {value: false, label: 'Female'},
  ];
  editWorkerForm!: FormGroup;
  fullWorker!: FullWorker;
  rolesName!: RoleName[];
  rolesNameDisplay: RoleName[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private workerService: WorkerService,
    private roleNameService: RolesNameService,
    private router :Router,
    private route:ActivatedRoute,
    public dialogRef: MatDialogRef<EditWorkerComponent>,
    private fb: FormBuilder,
  ) {
    this.editWorkerForm = this.fb.group({
      workerId: [
        null,
        [Validators.required, ,Validators.pattern("^[0-9]{9}$")],
      ],
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      start_of_work_date: [null, Validators.required],
      gender: [null, Validators.required],
      roles: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.roleNameService.getRolesName().subscribe({
      next: (res) => {this.rolesName = res,this.rolesNameDisplay=res },
    });
    this.workerService.getByIdWorker(this.data['id']).subscribe({
      next: (res) => {
        this.fullWorker = res;
        this.editWorkerForm.patchValue({
          workerId: this.fullWorker.workerId,
          firstName: this.fullWorker.firstName,
          lastName: this.fullWorker.lastName,
          start_of_work_date: new Date(this.fullWorker.start_of_work_date),
          gender: this.fullWorker.gender,
        }
        );

        const rolesArray = res.roles.map((role) =>
          this.fb.group({
            roleNameId: [role.roleNameId, Validators.required],
            date_of_entry_into_office: [
              new Date(role.date_of_entry_into_office),
              Validators.required,
            ],
            Managerial: [role.managerial, Validators.required],
          }),
        );
        this.editWorkerForm.setControl('roles', this.fb.array(rolesArray));
        this.editWorkerForm
          .get('roles')
          .value.forEach((role: any, index: number) => {
            const control = this.editWorkerForm
              .get('roles')
              ?.get(index.toString());
            control
              ?.get('date_of_entry_into_office')
              ?.setAsyncValidators(this.dateAfterStartValidator());
          });
      },
    });
  }

  dateAfterStartValidator() {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const entryDate = new Date(control.value);
        const startDate = new Date(
          this.editWorkerForm.get('start_of_work_date')?.value,
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
    return this.editWorkerForm.get('roles') as FormArray;
  }
  rolesNamechange(roleNameId: number, i: number): boolean {
    let selectedRoleIds = this.editWorkerForm.value.roles
        .map((role: any) => role.roleNameId);
    
    console.log(this.editWorkerForm.value.roles);
    console.log(selectedRoleIds);
    console.log(selectedRoleIds.includes(roleNameId) && selectedRoleIds.indexOf(roleNameId) != i);
    return selectedRoleIds.includes(roleNameId) && selectedRoleIds.indexOf(roleNameId) != i;
}
  onSubmit() {
    if (this.editWorkerForm.valid) {
      console.log(this.editWorkerForm.value);
      this.workerService
        .putWorker(this.data['id'], this.editWorkerForm.value)
        .subscribe({
          next: (res) => {
            console.log('putSucsses');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'this worker update',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          error: (res) => console.log('erro'),
        });
      this.closeDialog();
    } else {
      // Mark form fields as touched to display validation errors
      this.editWorkerForm.markAllAsTouched();
      console.log('not valid', this.editWorkerForm.value);
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  addRole() {
    const role = this.fb.group({
      roleNameId: [, Validators.required],
      date_of_entry_into_office: [, [Validators.required]],
      Managerial: [false, Validators.required],
    });
    const rolesFormGroup = this.editWorkerForm.get('roles') as FormArray;
    rolesFormGroup.push(role);

    const lastIndex = rolesFormGroup.length - 1;
    rolesFormGroup
      .at(lastIndex)
      .get('date_of_entry_into_office')
      ?.setAsyncValidators(this.dateAfterStartValidator());
  }
  removeRole(index: number) {
    const rolesArray = this.editWorkerForm.get('roles') as FormArray;
    rolesArray.removeAt(index);
  }
  
  
}
