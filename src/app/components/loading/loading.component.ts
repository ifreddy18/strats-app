import { Component } from '@angular/core';
import { StravaAuthService } from 'src/app/strava/strava-auth.service';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

	constructor(public stravaAuthService: StravaAuthService) { }

	getAuthorizationCode(): void {
		this.stravaAuthService.getAuthorizationCode();
	}

}
