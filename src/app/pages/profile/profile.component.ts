import { Component, AfterViewInit } from '@angular/core';
import { StravaService } from '../../strava/strava.service';
import { UserModel } from '../../models/user.model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit {

	public user;

	constructor(public stravaService: StravaService) { }

	ngAfterViewInit(): void {
		const interval = setInterval(() => {
			this.user = this.stravaService.user;
			if (this.user) {
				clearInterval(interval);
				console.log(this.user);
			}
		}, 500);
	}

}
