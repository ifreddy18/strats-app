import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



@Injectable()
export class StravaAuthService {

	private baseUrlAuth = 'https://www.strava.com/oauth';

	private clientId = '68448';
	private clientSecret = 'cc5f513bb5eab02deac5bf008da46f928ec6cb6f';
	private redirectUri = 'http://localhost:4200/home';
	private responseType = 'code';
	private approvalPrompt = 'auto'; // auto / force
	private scope = 'read_all,activity:read_all,profile:read_all';

	public accessToken: string;
	public stravaIsLinked = false;

	constructor(
		private routed: ActivatedRoute,
		private http: HttpClient,
		private router: Router
	) {
		this.initService();
	}

	setRefreshToken(token: string): void{
		document.cookie = `refresh_token=${ token }`;
	}

	get refreshToken(): string {
		return document.cookie.replace(/(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
	}

	get isAuthenticate(): boolean {
		return this.stravaIsLinked;
	}

	deleteRefreshToken(): void {
		document.cookie = 'refresh_token=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
	}

	initService(): void {
		// console.log(this.refreshToken.length);

		if ( null !== sessionStorage.getItem('accessToken') ) {
			this.accessToken = sessionStorage.getItem('accessToken');
			this.stravaIsLinked = true;
			return;
		}

		if ( null !== this.refreshToken && this.refreshToken.length > 0) {
			this.getAccessToken();
			return;
		}

		this.getAthleteTokens();

	}

	/**
	 * Se obtiene la autorizacion del usuario de usar sus datos de Strava
	 */
	getAuthorizationCode(): void {
		window.location.href = `${ this.baseUrlAuth }/authorize?`
				+ `client_id=${ this.clientId }`
				+ `&redirect_uri=${ this.redirectUri }`
				+ `&response_type=${ this.responseType }`
				+ `&approval_prompt=${ this.approvalPrompt }`
				+ `&scope=${ this.scope }`;
	}

	/**
	 * Se solicitan los parametros de la pagina redirect_uri enviada en getAuthorizationCode(),
	 * si existe el parametro code se procede a solicitar los token a la API de Strava
	 */
	getAthleteTokens(): void {
		console.log('getAthleteTokens');
		this.routed.queryParams.subscribe( resp => {
			if (resp.code) {
				this.stravaIsLinked = true;
				this.router.navigateByUrl('dashboard');
				this.getTokensWithAuthCode(resp.code);
			}
		}, ( err => console.warn(err) ));
	}

	/**
	 * Se solicitan los token de Strava con el code de autorizacion recibido por el
	 * @param authToken code
	 */
	getTokensWithAuthCode(authToken: string): void {
		console.log('getTokensWithAuthCode');
		this.http.post(`${ this.baseUrlAuth }/token?`
					+ `client_id=${ this.clientId }`
					+ `&client_secret=${ this.clientSecret }`
					+ `&code=${ authToken }`
					+ `&grant_type=authorization_code`, null)
				.subscribe( (resp: any) => {

					this.accessToken = resp.access_token;
					sessionStorage.setItem('accessToken', resp.access_token);
					this.setRefreshToken( resp.refresh_token );
					this.stravaIsLinked = true;

				}, ( err => console.warn(err) ));
	}

	/**
	 * Se solicita el access_token con el refresh_token
	 */
	getAccessToken(): void{
		console.log('getAccessToken');
		this.http.post(`${ this.baseUrlAuth }/token?`
					+ `client_id=${ this.clientId }`
					+ `&client_secret=${ this.clientSecret }`
					+ `&refresh_token=${ this.refreshToken }`
					+ `&grant_type=refresh_token`, null)
				.subscribe( (resp: any) => {

					this.accessToken = resp.access_token;
					sessionStorage.setItem('accessToken', resp.access_token);
					this.setRefreshToken( resp.refresh_token );
					this.stravaIsLinked = true;

				}, ( err => console.warn(err) ));
	}

	logout(): void {
		console.log('Logout');
		this.deleteRefreshToken();
		sessionStorage.removeItem('accessToken');
		this.accessToken = null;
		this.stravaIsLinked = false;
		this.router.navigateByUrl('/home');
	}




}
