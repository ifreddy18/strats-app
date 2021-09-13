import { Component } from '@angular/core';
import { StravaService } from '../../strava/strava.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

	dataToChart = {};

	constructor(public stravaService: StravaService) { }

	getDataToChart(data): void {
		this.dataToChart = data;
	}

}
