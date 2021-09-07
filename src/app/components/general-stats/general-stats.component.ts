import { Component, Input } from '@angular/core';
import { StravaService } from '../../strava/strava.service';

@Component({
	selector: 'app-general-stats',
	templateUrl: './general-stats.component.html',
	styleUrls: ['./general-stats.component.scss']
})
export class GeneralStatsComponent {

	@Input() activities = [];
	countWithAverageSpeed = 0;
    totalAverageSpeed = 0;
	totalDistance = 0;
	totalDuration = 0;
	totalElevation = 0;

	constructor(public stravaService: StravaService) {
	}

	get activitiesStats() {

		this.countWithAverageSpeed = 0;
	    this.totalAverageSpeed = 0;
		this.totalDistance = 0;
		this.totalDuration = 0;
		this.totalElevation = 0;

		this.activities.forEach( activity => {
			if (activity.moving_time) this.totalDuration += activity.moving_time;
			if (activity.distance) this.totalDistance += activity.distance;
			if (activity.total_elevation_gain) this.totalElevation += activity.total_elevation_gain;
			if (activity.average_speed && activity.average_speed > 0) {
				this.totalAverageSpeed += activity.average_speed;
				this.countWithAverageSpeed++;
			}
		});

		return {
			activitiesCount: this.activities.length,
			duration: this.secondsToHours(this.totalDuration),
			distance: this.distanceInKilometers(this.totalDistance),
			ritmo: this.minutePerKilometer(this.totalAverageSpeed / this.countWithAverageSpeed),
			velocidadMedia: this.averageSpeedKilometerHours(this.totalAverageSpeed / this.countWithAverageSpeed),
			elevacionGanada: this.elevationInMeters(this.totalElevation),
		};
	}

	secondsToHours(seconds: number): string {
		return `${ Math.floor(seconds / 3600)}h${Math.floor((seconds%3600)/60)}min`
	}

	distanceInKilometers(meters: number): string {
		return meters > 0 ? `${ (meters / 1000).toFixed(2)} Km` : ' - Km';
	}

	minutePerKilometer(average_speed: number): string {
		let minutes = ( 1 / average_speed ) * 1000/60;
		let seconds = Math.floor( (minutes - Math.floor(minutes)) * 60 );
		let secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
	
		return average_speed ? `${ Math.floor(minutes) }:${ secondsString } min/Km` : '- min/Km';
	}

	averageSpeedKilometerHours(average_speed: number): string {
		return average_speed ? `${ (average_speed * 3600 / 1000).toFixed(2) } Km/h` : '- Km/h';
	}

	elevationInMeters(total_elevation_gain: number): string {
		return total_elevation_gain > 0 ? `${this.totalElevation.toFixed(0)} metros`: '- metros';
	}
}
