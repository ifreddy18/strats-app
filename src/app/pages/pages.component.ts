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
	public activitiesPage = 0;
	public athleteActivities = [];

	constructor(
		public sidebarService: SidebarService,
		public stravaAuthService: StravaAuthService,
		public stravaService: StravaService
	) {
		this.getAthlete();
		this.getAthleteActivities();
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
			const {
				id,
				firstname,
				lastname,
				username,
				profile_medium,
				profile,
				date_preference,
				measurement_preference,
				created_at
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
				created_at
			};

			this.stravaService.user = this.user;

		}, err => console.warn(err));
	}

	/**
	 * Metodo con el que se obtienen todas las actividades realizadas por el athleta
	 */
	getAthleteActivities(): void {
		this.activitiesPage++;
		this.stravaService.getAthleteActivities(this.activitiesPage).subscribe( (resp: any) => {
			this.athleteActivities = this.athleteActivities.concat(resp);
			if (resp.length === 200) {
				this.getAthleteActivities();
			} else {
				this.stravaService.athleteActivities = this.athleteActivities;
				this.athleteActivities.forEach( activity => {
					if (!this.stravaService.activityTypeList.includes(activity.type)) {
						this.stravaService.activityTypeList.push(activity.type);
					}
				});
			}
		});
	}
}
