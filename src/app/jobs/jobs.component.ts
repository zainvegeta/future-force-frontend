import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent implements OnInit {
  categories: any = [];
  countries: any = [];
  jobs: any = [];
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.apiService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
    this.apiService.getCountries().subscribe((response) => {
      this.countries = response.data;
    });
    this.route.queryParams.subscribe((params) => {
      let query = params['query'];
      let categoryId = params['categoryId'];
      let countryId = params['countryId'];
      if (query && query != '') $('#query').val(query);
      if (categoryId && categoryId != 0) $('#category').val(categoryId).change();
      if (countryId && countryId != 0) $('#country').val(countryId).change();
      this.apiService
        .getJobs(1, 25, countryId ?? 0, categoryId ?? 0, query ?? '')
        .subscribe((response) => {
          this.jobs = response.data;
        });
    });
  }

  onSearchSubmit() {
    var query = $('#query').val();
    var countryId = $('#country').val() as number;
    var categoryId = $('#category').val() as number;
    this.apiService
      .getJobs(1, 25, countryId, categoryId, query)
      .subscribe((response) => {
        this.jobs = response.data;
      });
  }
}
