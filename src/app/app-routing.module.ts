import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'

const routes:Routes = [
	{ path: '', redirectTo: '/StarWars', pathMatch: 'full' },
	{ path: 'StarWars', component: DashboardComponent },
	{ path: 'StarWars/:resource',     component: HeroesComponent },
	{ path: 'StarWars/:resource/:id', component: HeroDetailComponent }
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}