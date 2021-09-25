import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

// Components
import { RangePillsComponent } from './range-pills/range-pills.component';
import { GeneralStatsComponent } from './general-stats/general-stats.component';
import { LoadingComponent } from './loading/loading.component';
import { BestStatsComponent } from './best-stats/best-stats.component';
import { ActivitiesTableComponent } from './activities-table/activities-table.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	declarations: [
		GeneralStatsComponent,
		RangePillsComponent,
		BestStatsComponent,
		LoadingComponent,
		ActivitiesTableComponent,
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatDatepickerModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatButtonToggleModule,
		MatTableModule,
		MatPaginatorModule,
		FormsModule,
		PipesModule
	],
	exports: [
		GeneralStatsComponent,
		RangePillsComponent,
		BestStatsComponent,
		LoadingComponent,
		ActivitiesTableComponent,
	],
})
export class ComponentsModule { }
