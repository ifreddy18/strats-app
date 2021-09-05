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
	public athleteActivities: any[];
	public activityTypeList = ['All'];
	public distances = [];
	/**
	 * Crear una metodo (para cada valor), que dado un rango de fechas, regrese un array con los valores
	 * con que le estoy pidiendo, con ID y fecha.
	 * El array sera usado para las graficas.
	 * Para obtener el valor total debo sumar el total de los valores contenidos en el array.
	 */

	constructor(
		private http: HttpClient,
		public stravaAuthService: StravaAuthService
	) {
		this.accessToken = stravaAuthService.accessToken;
		this.headers = this.headers.set('Authorization', `Bearer ${this.accessToken}`);
		this.getAthleteStats();
	}

	getAthleteData = new Observable(observer => {
		const intervalo = setInterval(() => {
			observer.next(this.user);
			if(this.user) {
				observer.complete();
				clearInterval(intervalo);
			}
		}, 1000);
	});

	getAthleteAllActivities = new Observable(observer => {
		const intervalo = setInterval(() => {
			if(this.athleteActivities) {
				observer.next(this.athleteActivities);
				observer.complete();
				clearInterval(intervalo);
			}
		}, 1000);
	});

	getAthlete(): Observable<object> {
		return this.http.get(`${this.baseUrl}/athlete`, {
			headers: this.headers
		});
	}

	getAthleteStats(): any {
		return this.http.get(`${this.baseUrl}/athletes/68259044/stats`, {
			headers: this.headers
		}).subscribe( resp => {
			console.log(resp);
			// Linea para guardar datos en string y llevarmelos al trabajo
			localStorage.setItem('athlete_stats', JSON.stringify(resp));
			console.log(JSON.parse(localStorage.getItem('athlete_stats')));
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


}
