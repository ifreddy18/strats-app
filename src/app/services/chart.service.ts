import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { StravaService } from '../strava/strava.service';
import { DataToChart } from '../models/data-chart.model';

@Injectable({
	providedIn: 'root'
})
export class ChartService {

	public userCreatAt;

	constructor(public stravaService: StravaService) {
		this.userCreatAt = stravaService.user.created_at;
	}


	addData(chart, dates, activities): void {
		chart.data.labels = dates.map(date => `${date.format('YYYY-MM-DD')} al ${date.endOf('week').format('YYYY-MM-DD')}`),

			chart.data.datasets.forEach(dataset => {
				if (dataset.label === 'Moving Time') {
					dataset.data = activities.map(duration => duration / 60);
				}
			});
		chart.update();
	}

	removeData(chart): void {
		chart.data.labels = [];
		chart.data.datasets.forEach(dataset => {
			dataset.data.pop();
		});
		chart.update();
	}

	/**
	 * @param dataToChart: Array of filter activities
	 * @param dates: all, year or month
	 * @param activitiesInRange: Fecha de inicio
	 * @param showChartBy: Fecha final
	 */
	activitiesToChart(dataToChart: DataToChart, dates, activitiesInRange): any {

		let startDate;
		let endOfRange;

		const {
			activities,
			selectedYear,
			selectedMonth,
			range
		} = dataToChart;

		dates = [];
		activitiesInRange = [];

		let i = 0;
		let dateFormated;

		switch (range.toLowerCase()) {
			case 'all':
				startDate = moment(this.stravaService.user.created_at).startOf('day');
				endOfRange = moment();
				break;

			case 'year':
				startDate = moment().year(selectedYear).format('YYYY')
					=== moment(this.stravaService.user.created_at).format('YYYY')
					? moment(this.stravaService.user.created_at)
					: moment().year(selectedYear).startOf('year');

				endOfRange = moment().year(selectedYear).format('YYYY')
					=== moment().format('YYYY')
					// ? moment().endOf('month')
					? moment()
					: moment().year(selectedYear).endOf('year');

				break;

			case 'month':
				startDate = moment().year(selectedYear).month(selectedMonth - 1).startOf('month');
				endOfRange = moment().year(selectedYear).month(selectedMonth - 1).endOf('month');
				break;
		}

		do {
			dates.push(startDate.clone().add(i, 'day').startOf('week'));
			activitiesInRange.push(0); // To use the same length of datesByWeek
			i += 7;
		} while (endOfRange.startOf('week').format('YYYY-MM-DD')
			!== startDate.clone().add(i - 7, 'day').startOf('week').format('YYYY-MM-DD'));


		dateFormated = dates.map(date => date.format('YYYY-MM-DD'));

		activities.forEach(activity => {
			const activityDate = moment(activity.start_date).startOf('week').format('YYYY-MM-DD');
			const index = dateFormated.indexOf(activityDate);
			if (index !== -1) {
				activitiesInRange[index] += activity.moving_time;
			}
		});

		return {
			dates,
			activitiesInRange
		};

	}

}
