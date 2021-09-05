import { Component, Input } from '@angular/core';
import { StravaService } from '../../strava/strava.service';

@Component({
	selector: 'app-general-stats',
	templateUrl: './general-stats.component.html',
	styleUrls: ['./general-stats.component.scss']
})
export class GeneralStatsComponent {

	@Input() activities = [];

	constructor(public stravaService: StravaService) {
		console.log(this.activities);
	}

	// get activities(): number {
	// 	return this.stravaService.athleteActivities.length;
	// }

	// get calories(): number {
	// 	return this.stravaService.athleteActivities.length;
	// }

	// get duration(): number {
	// 	return this.stravaService.athleteActivities.length;
	// }

	// get distance(): number {
	// 	return this.stravaService.athleteActivities.length;
	// }
}

// 0x48B6B7106d8181a3b7ef4De31D4fa5E0D9765FC6
// 0x48B6B7106d8181a3b7ef4De31D4fa5E0D9765FC6