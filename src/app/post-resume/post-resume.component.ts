import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';
import { DropdownModule } from 'primeng/dropdown';
import { FileUpload, FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { Helpers } from '../helpers';
@Component({
  selector: 'app-post-resume',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    FileUploadModule,
  ],

  templateUrl: './post-resume.component.html',
  styleUrl: './post-resume.component.css',
})
export class PostResumeComponent implements OnInit {
  resumeForm: FormGroup;
  genders: any[];
  formData: FormData;
  showFileRequired: boolean;
  showFormErrors: boolean;
  @ViewChild('fileInput') fileInput: FileUpload;
  constructor(
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.resumeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      position: new FormControl('', [Validators.required]),
      gender: new FormControl('Male', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });

    this.genders = [
      { name: 'Male', code: 'male' },
      { name: 'Female', code: 'female' },
    ];
  }
  get name() {
    return this.resumeForm.get('name');
  }
  get email() {
    return this.resumeForm.get('email');
  }
  get phone() {
    return this.resumeForm.get('phone');
  }
  get position() {
    return this.resumeForm.get('position');
  }
  get gender() {
    return this.resumeForm.get('gender');
  }
  get message() {
    return this.resumeForm.get('message');
  }

  onClickSubmit(data: any) {
    Helpers.validateAllFormFields(this.resumeForm);
    if (!this.formData || !this.formData.has('files') || !this.resumeForm.valid) {
      this.showFormErrors = true;
      this.showFileRequired = true;
    } else {
      this.apiService.postResume(data).subscribe((response) => {
        this.formData.append('refId', response.data.id);
        this.formData.append('ref', 'api::resume.resume');
        this.formData.append('field', 'file');
        this.apiService.uploadFile(this.formData).subscribe((response) => {
          this.resumeForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Your resume was submitted successfully',
          });
          this.resumeForm.reset();
          this.fileInput.clear();

        });
      });
    }
  }

  onUpload(event: FileUploadHandlerEvent) {
    this.showFileRequired = false;
    this.formData = new FormData();
    this.formData.append('files', event.files[0]);
  }
}
