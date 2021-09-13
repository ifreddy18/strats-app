import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationChartComponent } from './duration-chart/duration-chart.component';
// import { ChartsModule } from 'ng2-charts';


@NgModule({
	declarations: [
		DurationChartComponent
	],
	imports: [
		CommonModule,
		// ChartsModule
	],
	exports: [
		DurationChartComponent
	]
})
export class ChartsModule { }
