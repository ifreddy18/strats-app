import { AfterViewInit, Component } from '@angular/core';
import { UserModel } from '../models/user.model';
import { StravaAuthService } from '../strava/strava-auth.service';
import { StravaService } from '../strava/strava.service';
import { SidebarService } from '../services/sidebar.service';

@Component({
	selector: 'app-pages',
	templateUrl: './pages.component.html',
	styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements AfterViewInit {

	public sidebar;
	public user: UserModel;

	constructor(
		public sidebarService: SidebarService,
		public stravaAuthService: StravaAuthService,
		public stravaService: StravaService
	) {
		this.getAthlete();
	}

	ngAfterViewInit(): void {
		this.sidebar = document.querySelector('.sidebar');
		this.sidebarService.sidebar = this.sidebar;
	}

	getAuthorizationCode(): void {
		this.stravaAuthService.getAuthorizationCode();
	}

	toggleSidebar(): void {
		this.sidebar.classList.toggle('active');
	}

	getAthlete(): void {
		this.stravaService.getAthlete().subscribe((resp: any) => {
			console.log(resp);
			const {
				id,
				firstname,
				lastname,
				username,
				profile_medium,
				profile,
				date_preference,
				measurement_preference,
			} = resp;

			this.user = {
				id,
				firstname,
				lastname,
				username,
				profile_medium,
				profile,
				date_preference,
				measurement_preference,
			};

			console.log(this.user);

		}, err => console.warn(err));
	}
}
