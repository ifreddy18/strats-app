import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';

const childRoutes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'activities', component: ActivitiesComponent },
	{ path: 'activity/:id', component: ActivityDetailsComponent },
];

@NgModule({
	imports: [RouterModule.forChild(childRoutes)],
	exports: [RouterModule]
})
export class ChildRoutesModule { }
