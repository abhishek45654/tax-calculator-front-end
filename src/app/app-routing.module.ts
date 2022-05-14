import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { IncomeDataFormComponent } from './income-data-form/income-data-form.component';
import { AuthGaurd } from './security/auth.gaurd';
import { HistoryComponent } from './history/history.component';
import { ResourceLinkComponent } from './resource-link/resource-link.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path:'income', component: IncomeDataFormComponent, canActivate:[AuthGaurd]},
  { path: 'history', component: HistoryComponent,canActivate: [AuthGaurd]},
  { path: 'link', component: ResourceLinkComponent},
  { path:'**',component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
