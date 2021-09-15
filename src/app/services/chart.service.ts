import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { StravaService } from '../strava/strava.service';
import { DataToChart } from '../models/data-chart.model';
import { Chart } from 'chart.js';

@Injectable({
	providedIn: 'root'
})
export class ChartService {

	public userCreatAt;

	constructor(public stravaService: StravaService) {
		this.userCreatAt = stravaService.user.created_at;
	}


	public addData(chart: Chart, dates: moment.Moment[], activities: any[], showChartBy: string): void {
		chart.data.labels = dates.map(date => this.getLabelsFormat(date, showChartBy)),

			chart.data.datasets.forEach(dataset => {
				if (dataset.label === 'Moving Time') {
					dataset.data = activities.map(duration => duration / 60);
				}
			});
		chart.update();
	}

	public removeData(chart: Chart): void {
		chart.data.labels = [];
		chart.data.datasets.forEach(dataset => {
			dataset.data.pop();
		});
		chart.update();
	}

	/**
	 *
	 * @param dataToChart: Obj DataToChart
	 * @param showChartBy: 'year', 'month', 'week' or 'day'
	 * @returns dates , activitiesParamValue
	 */
	public activitiesToChart(dataToChart: DataToChart, showChartBy: string): any {

		const {
			startDate,
			endOfRange
		} = this.getStartAndEndOfRange(dataToChart, this.userCreatAt);

		const {
			dates,
			activitiesParamValue
		} = this.getDatesAndActivitiesParamValues(startDate, endOfRange, showChartBy);

		const { activities } = dataToChart;
		const dateFormated = dates.map(date => date.format('YYYY-MM-DD'));

		activities.forEach(activity => {
			let activityDate;

			switch (showChartBy) {
				case 'year':
					activityDate = moment(activity.start_date).startOf('year').format('YYYY-MM-DD');
					break;
				case 'month':
					activityDate = moment(activity.start_date).startOf('month').format('YYYY-MM-DD');
					break;
				case 'week':
					activityDate = moment(activity.start_date).startOf('week').format('YYYY-MM-DD');
					break;
				case 'day':
					activityDate = moment(activity.start_date).startOf('day').format('YYYY-MM-DD');
					break;
			}

			const index = dateFormated.indexOf(activityDate);

			if (index !== -1) {
				activitiesParamValue[index] += activity.moving_time;
			}
		});

		return {
			dates,
			activitiesParamValue
		};

	}

	private getStartAndEndOfRange(dataToChart: DataToChart, userCreatAt): any {

		let startDate;
		let endOfRange;

		const {
			selectedYear,
			selectedMonth,
			range
		} = dataToChart;

		switch (range.toLowerCase()) {
			case 'all':
				startDate = moment(userCreatAt).startOf('day');
				endOfRange = moment();
				break;

			case 'year':
				startDate = moment().year(selectedYear).format('YYYY')
					=== moment(userCreatAt).format('YYYY')
					? moment(userCreatAt)
					: moment().year(selectedYear).startOf('year');

				endOfRange = moment().year(selectedYear).format('YYYY')
					=== moment().format('YYYY')
					? moment()
					: moment().year(selectedYear).endOf('year');

				break;

			case 'month':
				startDate = moment().year(selectedYear).month(selectedMonth - 1).startOf('month');
				endOfRange = moment().year(selectedYear).month(selectedMonth - 1).endOf('month');
				break;
		}

		console.log(`startDate: ${startDate.format('YYYY-MM-DD')}`);
		console.log(`endOfRange: ${endOfRange.format('YYYY-MM-DD')}`);

		return {
			startDate,
			endOfRange
		};

	}

	private getDatesAndActivitiesParamValues(startDate: moment.Moment, endOfRange: moment.Moment, showChartBy: string): any {
		const activitiesParamValue = [];
		const dates = [];
		let i = 0;

		switch (showChartBy) {
			case 'year':
				do {
					dates.push(startDate.clone().add(i, 'year').startOf('year'));
					activitiesParamValue.push(0); // To use the same length of datesByWeek
					i++;
				} while (endOfRange.startOf('year').format('YYYY-MM-DD')
					!== startDate.clone().add(i - 1, 'year').startOf('year').format('YYYY-MM-DD'));
				break;

			case 'month':
				do {
					dates.push(startDate.clone().add(i, 'month').startOf('month'));
					activitiesParamValue.push(0); // To use the same length of datesByWeek
					i++;
				} while (endOfRange.startOf('month').format('YYYY-MM-DD')
					!== startDate.clone().add(i - 1, 'month').startOf('month').format('YYYY-MM-DD'));
				break;

			case 'week':
				do {
					dates.push(startDate.clone().add(i, 'day').startOf('week'));
					activitiesParamValue.push(0); // To use the same length of datesByWeek
					i += 7;
				} while (endOfRange.startOf('week').format('YYYY-MM-DD')
					!== startDate.clone().add(i - 7, 'day').startOf('week').format('YYYY-MM-DD'));
				break;

			case 'day':
				do {
					dates.push(startDate.clone().add(i, 'day').startOf('day'));
					activitiesParamValue.push(0); // To use the same length of datesByWeek
					i++;
				} while (endOfRange.startOf('day').format('YYYY-MM-DD')
					!== startDate.clone().add(i - 1, 'day').startOf('day').format('YYYY-MM-DD'));
				break;

		}

		return {
			dates,
			activitiesParamValue
		};
	}

	public getLabelsFormat(date: moment.Moment, showChartBy: string): string {
		switch (showChartBy) {
			case 'year':
				return `${date.format('YYYY')}`;
				break;

			case 'month':
				return `${date.format('MMMM')}`;
				break;

			case 'week':
				return `${date.format('YYYY-MM-DD')} al ${date.endOf('week').format('YYYY-MM-DD')}`;
				break;

			case 'day':
				return `${date.format('YYYY-MM-DD')}`;
				break;
		}

	}

}
