import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourceComponent } from './resource/resource.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ResourceDetailComponent } from './resource-detail/resource-detail.component'

const routes:Routes = [
	{ path: '', redirectTo: '/StarWars', pathMatch: 'full' },
	{ path: 'StarWars',               component: DashboardComponent },
	{ path: 'StarWars/:resource',     component: ResourceComponent },
	{ path: 'StarWars/:resource/:id', component: ResourceDetailComponent }
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}
