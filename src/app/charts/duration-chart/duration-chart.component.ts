import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
// import { Chart, ChartDataset, ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';
import { StravaService } from '../../strava/strava.service';
import * as moment from 'moment';

@Component({
	selector: 'app-duration-chart',
	templateUrl: './duration-chart.component.html',
	styleUrls: ['./duration-chart.component.scss']
})
export class DurationChartComponent implements AfterViewInit {

	@Input() dataToChart;
	@ViewChild('canvas') canvas;
	public ctx;
	public myChart;
	public activitiesByWeek = [];
	public datesByWeek = [];

	constructor(public stravaService: StravaService) { }

	ngAfterViewInit(): void {
		this.ctx = this.canvas.nativeElement;

		const intervalo = setInterval(() => {
			if (this.dataToChart) {
				this.activitiesToChart(this.dataToChart);
				this.renderChart();
				clearInterval(intervalo);
			}
		}, 1000);

	}

	renderChart(): void {
		this.myChart = new Chart(this.ctx, {
			type: 'bar',
			data: {
				labels: this.datesByWeek.map(date => `${date.format('YYYY-MM-DD')} al ${date.endOf('week').format('YYYY-MM-DD')}`),
				datasets: [
					{
						label: 'Moving Time',
						data: this.activitiesByWeek.map(duration => duration / 3600),
						backgroundColor: ['rgba(255, 99, 132, 0.8)']
					}
				]
			}
		});
	}

	updateChart(): void {
		this.removeData();
		this.activitiesToChart(this.dataToChart);
		this.addData();
	}

	addData(): void {
		this.myChart.data.labels = this.datesByWeek.map(date => `${date.format('YYYY-MM-DD')} al ${date.endOf('week').format('YYYY-MM-DD')}`),

			this.myChart.data.datasets.forEach(dataset => {
				if (dataset.label === 'Moving Time') {
					dataset.data = this.activitiesByWeek.map(duration => duration / 60);
				}
			});
		this.myChart.update();
	}

	removeData(): void {
		this.myChart.data.labels = [];
		this.myChart.data.datasets.forEach(dataset => {
			dataset.data.pop();
		});
		this.myChart.update();
	}


	/**
	 * @param activitiesArray: Array of filter activities
	 * @param rangeType: all, year or month
	 * @param year: Fecha de inicio
	 * @param month: Fecha final
	 */
	activitiesToChart(dataToChart): void {

		const datesByDay = []; // Day dates since startDate to today
		let startDate;
		let endOfRange;

		const {
			activities,
			selectedYear,
			selectedMonth,
			range
		} = dataToChart;

		this.datesByWeek = [];
		this.activitiesByWeek = [];

		let i = 0;
		let dateByWeekFormated;

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
			this.datesByWeek.push(startDate.clone().add(i, 'day').startOf('week'));
			this.activitiesByWeek.push(0); // To use the same length of datesByWeek
			i += 7;
		} while (endOfRange.startOf('week').format('YYYY-MM-DD')
			!== startDate.clone().add(i - 7, 'day').startOf('week').format('YYYY-MM-DD'));


		dateByWeekFormated = this.datesByWeek.map(date => date.format('YYYY-MM-DD'));

		activities.forEach(activity => {
			const activityDate = moment(activity.start_date).startOf('week').format('YYYY-MM-DD');
			const index = dateByWeekFormated.indexOf(activityDate);
			if (index !== -1) {
				this.activitiesByWeek[index] += activity.moving_time;
			}
		});

	}



}
