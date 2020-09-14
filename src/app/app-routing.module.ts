import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuardService } from './service/auth-guard.service';
import { CreateOrUpdateEmployeeComponent } from './create-or-update-employee/create-or-update-employee.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    component: AdminDashboardComponent,
  },
  {
    path: 'create',
    canActivate: [AuthGuardService],
    component: CreateOrUpdateEmployeeComponent,
  },
  {
    path: 'update/:id',
    canActivate: [AuthGuardService],
    component: CreateOrUpdateEmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
