import { Component, OnInit } from '@angular/core';
import { StravaService } from '../../strava/strava.service';

@Component({
	selector: 'app-activities',
	templateUrl: './activities.component.html',
	styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {

	public activities;

	constructor(public stravaService: StravaService) { }

	getData(event): void {
		this.activities = event.activities;
	}

}
