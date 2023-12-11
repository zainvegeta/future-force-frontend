import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from '../helpers';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,SanitizeHtmlPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categories: any=[];
  featuredCategories: any=[];
  countries: any=[];
  jobs: any=[];
  jobPage:number=1;
  jobPageSize=5;
  featuredJobs: any=[];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
    this.apiService.getFeaturedCategories().subscribe((response) => {
      this.featuredCategories = response.data;     
    });
    this.apiService.getCountries().subscribe((response) => {
      this.countries = response.data;
    });
    this.apiService.getJobs(this.jobPage,this.jobPageSize).subscribe((response) => {
      this.jobs = response.data;
    });
    this.apiService.getFeaturedJobs().subscribe((response) => {
      this.featuredJobs = response.data;     
    });
  }

  loadMoreJobs():void{
    this.jobPage=this.jobPage+1;
    this.apiService.getJobs(this.jobPage,this.jobPageSize).subscribe((response) => {
      this.jobs = [ ...this.jobs, ...response.data];
    });
  }
}
