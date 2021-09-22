import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralStatsComponent } from './general-stats/general-stats.component';
import { MatIconModule } from '@angular/material/icon';
import { RangePillsComponent } from './range-pills/range-pills.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BestStatsComponent } from './best-stats/best-stats.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
	declarations: [
		GeneralStatsComponent,
		RangePillsComponent,
		BestStatsComponent,
		LoadingComponent,
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatDatepickerModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		MatInputModule,
		MatButtonToggleModule
	],
	exports: [
		GeneralStatsComponent,
		RangePillsComponent,
		BestStatsComponent,
		LoadingComponent,
	]
})
export class ComponentsModule { }
