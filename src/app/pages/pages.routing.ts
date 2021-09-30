import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';

const routes: Routes = [
	{
		path: 'dashboard',
		component: PagesComponent,
		children: [
			{ path: '', component: DashboardComponent },
			{ path: 'profile', component: ProfileComponent },
			{ path: 'activities', component: ActivitiesComponent },
			{ path: 'activity/:id', component: ActivityDetailsComponent },
		]
	},
	{
		path: 'home',
		component: PagesComponent,
		children: [
			{ path: '', component: HomeComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule { }
