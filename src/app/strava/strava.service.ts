import { Injectable } from '@angular/core';
import { StravaAuthService } from './strava-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable()
export class StravaService {

	public baseUrl = 'https://www.strava.com/api/v3';
	public headers = new HttpHeaders();
	public user;
	public athleteActivities: any[];
	public activityTypeList = ['All'];
	public distances = [];

	public getAthleteData$ = new Observable(observer => {
		const intervalo = setInterval(() => {
			observer.next(this.user);
			if (this.user) {
				observer.complete();
				clearInterval(intervalo);
			}
		}, 1000);
	});

	public getAthleteAllActivities$ = new Observable(observer => {
		const intervalo = setInterval(() => {
			if (this.athleteActivities) {
				observer.next(this.athleteActivities);
				observer.complete();
				clearInterval(intervalo);
			}
		}, 1000);
	});

	constructor(
		private http: HttpClient,
		public stravaAuthService: StravaAuthService
	) {
		this.headers = this.headers.set('Authorization', `Bearer ${stravaAuthService.accessToken}`);
	}

	getAthlete(): Observable<object> {
		return this.http.get(`${this.baseUrl}/athlete`, {
			headers: this.headers
		});
	}

	getAthleteStats(id: number | string): Observable<object> {
		return this.http.get(`${this.baseUrl}/athletes/${id}/stats`, {
			headers: this.headers
		});
	}

	getAthleteActivities(page: number): Observable<object> {
		return this.http.get(`${this.baseUrl}/athlete/activities`, {
			headers: this.headers,
			params: {
				per_page: '200',
				page: `${page}`
			}
		});
	}

	getActivityById(id: number): Observable<object> {
		return this.http.get(`${this.baseUrl}/activities/${id}`, {
			headers: this.headers
		});
	}

	logout(): void {
		this.user = null;
		this.athleteActivities = [];
		this.activityTypeList = ['All'];
	}


}
