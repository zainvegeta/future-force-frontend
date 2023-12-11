import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { Helpers } from '../helpers';

@Component({
  selector: 'app-post-grievance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-grievance.component.html',
  styleUrl: './post-grievance.component.css',
})
export class PostGrievanceComponent implements OnInit {
  grievanceForm: FormGroup;
  showFormErrors: boolean;
  constructor(
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.grievanceForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      passportNo: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      grievance: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.grievanceForm.get('name');
  }
  get address() {
    return this.grievanceForm.get('address');
  }
  get passportNo() {
    return this.grievanceForm.get('passportNo');
  }
  get phone() {
    return this.grievanceForm.get('phone');
  }
  get email() {
    return this.grievanceForm.get('email');
  }
  get grievance() {
    return this.grievanceForm.get('grievance');
  }
  onClickSubmit(data: any) {
    Helpers.validateAllFormFields(this.grievanceForm);
    if (this.grievanceForm.valid) {
      this.apiService.postGrievance(data).subscribe((response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Your suggestion / grievance was submitted successfully',
        });
        this.grievanceForm.reset();
      });
    } else {
      this.showFormErrors = true;
    }
  }
}
