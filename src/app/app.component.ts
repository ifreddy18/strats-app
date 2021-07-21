import { Component } from '@angular/core';
import { StravaAuthService } from './strava/strava-auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {

	constructor(public stravaAuthService: StravaAuthService) {
	}

	getAuthorizationCode(): void {
		this.stravaAuthService.getAuthorizationCode();
	}


}
