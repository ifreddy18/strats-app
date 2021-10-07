import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
		console.log('StravaAuthGuard');

		if (!this.stravaAuthService.isAuthenticate) {
			this.router.navigateByUrl('home');
		}

		return this.stravaAuthService.isAuthenticate;
	}


}
