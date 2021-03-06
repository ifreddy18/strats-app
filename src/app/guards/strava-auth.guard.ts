import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { StravaAuthService } from '../strava/strava-auth.service';

@Injectable({
	providedIn: 'root'
})
export class StravaAuthGuard implements CanActivate {

	constructor(
		private stravaAuthService: StravaAuthService,
		private router: Router,
		private routed: ActivatedRoute) { }

	canActivate(): boolean {

		if (!this.stravaAuthService.isAuthenticate) {
			this.router.navigateByUrl('home');
		}

		return this.stravaAuthService.isAuthenticate;
	}


}
