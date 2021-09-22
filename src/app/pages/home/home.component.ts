import { Component } from '@angular/core';
import { StravaAuthService } from '../../strava/strava-auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	constructor(private stravaAuthService: StravaAuthService) { }

	getAuthorizationCode(): void {
		this.stravaAuthService.getAuthorizationCode();
	}

}
