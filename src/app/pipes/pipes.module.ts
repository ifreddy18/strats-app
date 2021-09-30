import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistancePipe } from './distance.pipe';
import { DurationPipe } from './duration.pipe';
import { AvgSpeedPipe } from './avg-speed.pipe';
import { PacePipe } from './pace.pipe';

@NgModule({
	declarations: [
		DistancePipe,
		DurationPipe,
		AvgSpeedPipe,
		PacePipe,
	],
	imports: [
		CommonModule
	],
	exports: [
		DistancePipe,
		DurationPipe,
		AvgSpeedPipe,
		PacePipe,
	]
})
export class PipesModule { }
