import { Injectable } from '@angular/core';
import { StravaAuthService } from './strava-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable()
export class StravaService {

	public baseUrl = 'https://www.strava.com/api/v3';
	public accessToken: string;
	public headers = new HttpHeaders();
	public user: UserModel;


	constructor(
		private http: HttpClient,
		public stravaAuthService: StravaAuthService
	) {
		this.accessToken = stravaAuthService.accessToken;
		this.headers = this.headers.set('Authorization', `Bearer ${this.accessToken}`);
	}

	getAthlete(): Observable<object> {
		return this.http.get(`${this.baseUrl}/athlete`, {
			headers: this.headers
		});
	}

	getAthleteActivities(): Observable<object> {
		return this.http.get(`${this.baseUrl}/athlete/activities`, {
			headers: this.headers
		});
	}


}
