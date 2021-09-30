import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StravaService } from '../../strava/strava.service';

@Component({
	selector: 'app-activity-details',
	templateUrl: './activity-details.component.html',
	styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent {

	private id;
	public activity;

	constructor(
		public stravaService: StravaService,
		private route: ActivatedRoute)
	{
		this.id = this.route.snapshot.params.id;
		this.getActivityById(this.id);
	}

	getActivityById(id): void {
		this.stravaService.getActivityById(id).subscribe( (resp: any) => {
			this.activity = resp;
		});
	}

}
