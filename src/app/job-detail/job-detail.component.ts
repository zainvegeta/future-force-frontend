import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { SanitizeHtmlPipe } from '../helpers';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule,SanitizeHtmlPipe],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css',
})
export class JobDetailComponent implements OnInit {
  job: any = null;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.apiService.getJob(parseInt(id as string)).subscribe((response) => {
        this.job = response.data;
      });
    });
  }
}
