import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';

// Modules
import { PagesRoutingModule } from './pages.routing';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from '../charts/charts.module';
import { ComponentsModule } from '../components/components.module';

// Components
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
	declarations: [
		PagesComponent,
		DashboardComponent,
		ProfileComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatListModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
		MatTreeModule,
		MatMenuModule,
		PagesRoutingModule,
		SharedModule,
		ComponentsModule,
		ChartsModule
	],
	exports: [
		PagesComponent
	]
})
export class PagesModule { }
