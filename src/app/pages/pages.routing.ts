import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { StravaAuthGuard } from '../guards/strava-auth.guard';

// Components
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
	{
		path: 'dashboard',
		component: PagesComponent,
		canActivate: [ StravaAuthGuard ],
		loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
	},
	{
		path: 'home',
		component: HomeComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule { }
