import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  categories: any=[];
  countries: any=[];
  jobs: any=[];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
    this.apiService.getCountries().subscribe((response) => {
      this.countries = response.data;
    });
    this.apiService.getJobs().subscribe((response) => {
      this.jobs = response.data;
    });
  }

  onSearchSubmit() {
    var query=$('#query').val();
    var countryId=$('#country').val() as number;
    var categoryId=$('#category').val() as number;
    console.log('country',countryId);
    console.log('category',categoryId);
    this.apiService.getJobs(1,25,countryId,categoryId,query).subscribe((response) => {
      console.log(response.data);
      this.jobs = response.data;
    });
 }
}
