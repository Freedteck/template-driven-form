import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  country: string = '';
  occupation: string = '';
  countries: any[] = [];
  occupations: string[] = [
    'Frontend Developer',
    'Backend Developer',
    'Designer',
    'Devops Engineer',
  ];
  successful: string = '';

  private url: string = 'https://restcountries.com/v3.1/all';

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchCountries();
  }

  fetchCountries() {
    this.http.get(this.url).subscribe(
      (data: any) => {
        this.countries = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.successful === 'true') {
        this.toastr.success('Form submitted successfully!', 'Success');
        this.router.navigate(['/success']);
      } else {
        this.toastr.error('Form submission failed. Please try again.', 'Error');
        this.router.navigate(['/']);
      }
    } else {
      this.toastr.warning('Please fill out all required fields.', 'Warning');
    }
  }
}
