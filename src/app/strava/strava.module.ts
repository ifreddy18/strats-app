import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StravaAuthService } from './strava-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule
	],
	providers: [
		StravaAuthService
	]
})
export class StravaModule { }
