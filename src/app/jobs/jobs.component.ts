import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  categories: any=[];
  countries: any=[];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
    this.apiService.getCountries().subscribe((response) => {
      this.countries = response.data;
    });
  }
}
