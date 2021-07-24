import { AfterViewInit, Component } from '@angular/core';
import { StravaAuthService } from './strava/strava-auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {

	public sidebar;

	constructor(
		public stravaAuthService: StravaAuthService) {
	}

	ngAfterViewInit(): void {
		this.sidebar = document.querySelector('.sidebar');
	}

	getAuthorizationCode(): void {
		this.stravaAuthService.getAuthorizationCode();
	}

	openSidenav(): void {
		this.sidebar.classList.toggle('active');
	}


}
