import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-best-stats',
	templateUrl: './best-stats.component.html',
	styleUrls: ['./best-stats.component.scss']
})
export class BestStatsComponent  {

	@Input() activities = [];

	constructor() {
	}

}
