import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistancePipe } from './distance.pipe';
import { DurationPipe } from './duration.pipe';



@NgModule({
	declarations: [
		DistancePipe,
		DurationPipe
	],
	imports: [
		CommonModule
	],
	exports: [
		DistancePipe,
		DurationPipe
	]
})
export class PipesModule { }
