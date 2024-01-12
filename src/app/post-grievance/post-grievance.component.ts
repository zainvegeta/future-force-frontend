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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReCaptchaV3Service, RecaptchaV3Module } from 'ng-recaptcha';
@Component({
  selector: 'app-post-grievance',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    RecaptchaV3Module,
  ],
  templateUrl: './post-grievance.component.html',
  styleUrl: './post-grievance.component.css',
})
export class PostGrievanceComponent implements OnInit {
  grievanceForm: FormGroup;
  showFormErrors: boolean;
  loading: boolean = false;
  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private recaptchaV3Service: ReCaptchaV3Service
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
      this.loading = true;
      this.recaptchaV3Service.execute('postResume').subscribe((token) => {
        this.apiService.validateRecaptcha(token).subscribe((response) => {
          if (response.success == true) {
            this.apiService.postGrievance(data).subscribe((response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail:
                  'Your suggestion / grievance was submitted successfully',
              });
              this.grievanceForm.reset();
              this.loading = false;
            });
          }
        });
      });
    } else {
      this.showFormErrors = true;
    }
  }
}
