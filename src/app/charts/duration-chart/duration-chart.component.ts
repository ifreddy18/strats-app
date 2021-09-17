import { Component, ElementRef, Input, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
// import { Chart, ChartDataset, ChartOptions } from 'chart.js';
import Chart, { ChartDataset } from 'chart.js/auto';
import { StravaService } from '../../strava/strava.service';
import { ChartService } from '../../services/chart.service';
import { DataToChart } from '../../models/data-chart.model';

@Component({
	selector: 'app-duration-chart',
	templateUrl: './duration-chart.component.html',
	styleUrls: ['./duration-chart.component.scss']
})
export class DurationChartComponent implements AfterViewInit, OnChanges {

	@Input() dataToChart: DataToChart;
	@ViewChild('canvas') canvas;
	@Input() activityParam = 'moving_time'; // moving_time ; distance
	@Input() labelForDataset = 'Moving Time (hours)';
	@Input() backgroundColor = ['rgba(255, 99, 132, 0.8)'];
	@Input() inputIndexAxis;
	public ctx;
	public myChart;
	public activitiesParamValue = [];
	public dates = [];
	public showChartBy = 'month';
	public options;

	constructor(
		public stravaService: StravaService,
		public chartService: ChartService
	) { }

	ngAfterViewInit(): void {
		this.ctx = this.canvas.nativeElement;
		this.options = {
			indexAxis: this.inputIndexAxis !== 'x' && this.inputIndexAxis !== 'y' ? 'x' : this.inputIndexAxis,
		};

		const intervalo = setInterval(() => {
			if (this.dataToChart) {
				const {
					dates,
					activitiesParamValue
				} = this.chartService.activitiesToChart(this.dataToChart, this.showChartBy, this.activityParam);

				this.dates = dates;
				this.activitiesParamValue = activitiesParamValue;

				this.renderChart();
				clearInterval(intervalo);
			}
		}, 1000);

	}

	ngOnChanges(): void {
		if (this.myChart) {
			this.updateChart();
		}
	}

	renderChart(): void {
		this.myChart = new Chart(this.ctx, {
			type: 'bar',
			data: {
				labels: this.dates.map(date => this.chartService.getLabelsFormat(date, this.showChartBy)),
				datasets: [
					{
						label: this.labelForDataset,
						data: this.activitiesParamValue.map( value =>
							this.chartService.getFotmatedDataForDataset(this.activityParam, value)
						),
						backgroundColor: this.backgroundColor
					}
				]
			},
			options: this.options,
		});
	}

	updateChart(): void {
		this.chartService.removeData(this.myChart);

		const {
			dates,
			activitiesParamValue
		} = this.chartService.activitiesToChart(this.dataToChart, this.showChartBy, this.activityParam);

		this.dates = dates;
		this.activitiesParamValue = activitiesParamValue;

		this.chartService.addData(
			this.myChart,
			this.dates,
			this.activitiesParamValue,
			this.showChartBy,
			this.activityParam
		);
	}

	onChangeSelect(event): void {
		this.updateChart();
	}

}
