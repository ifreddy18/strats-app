import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { StravaAuthService } from './strava-auth.service';
import { StravaService } from './strava.service';



@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule
	],
	providers: [
		StravaAuthService,
		StravaService
	]
})
export class StravaModule { }
