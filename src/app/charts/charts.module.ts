import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationChartComponent } from './duration-chart/duration-chart.component';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// import { ChartsModule } from 'ng2-charts';


@NgModule({
	declarations: [
		DurationChartComponent
	],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatSelectModule
		// ChartsModule
	],
	exports: [
		DurationChartComponent
	]
})
export class ChartsModule { }
