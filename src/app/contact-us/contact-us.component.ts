import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Helpers } from '../helpers';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReCaptchaV3Service, RecaptchaV3Module } from 'ng-recaptcha';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    RecaptchaV3Module,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  showFormErrors: boolean;
  loading: boolean = false;
  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }
  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get subject() {
    return this.contactForm.get('subject');
  }
  get message() {
    return this.contactForm.get('message');
  }

  onClickSubmit(data: any) {
    Helpers.validateAllFormFields(this.contactForm);
    if (this.contactForm.valid) {
      this.loading = true;
      this.recaptchaV3Service.execute('postResume').subscribe((token) => {
        this.apiService.validateRecaptcha(token).subscribe((response) => {
          if (response.success == true) {
            this.apiService.postMessage(data).subscribe((response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Your message was send successfully',
              });
              this.contactForm.reset();
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
