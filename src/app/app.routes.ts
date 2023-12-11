import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ServicesComponent } from './services/services.component';
import { StatutoryInformationComponent } from './statutory-information/statutory-information.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PostResumeComponent } from './post-resume/post-resume.component';
import { PostGrievanceComponent } from './post-grievance/post-grievance.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailComponent } from './job-detail/job-detail.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'jobs', component: JobsComponent },
    { path: 'job-detail/:id', component: JobDetailComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'terms-conditions', component: TermsConditionsComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'statutory-information', component: StatutoryInformationComponent },
    { path: 'post-resume', component: PostResumeComponent },
    { path: 'post-grievance', component: PostGrievanceComponent },
];
