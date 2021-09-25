import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Module
import { StravaModule } from './strava/strava.module';
import { PagesModule } from './pages/pages.module';

// Components

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		PagesModule,
		StravaModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
