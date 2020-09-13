import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { AuthGuardService } from './service/auth-guard.service';

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
    component: NewEmployeeComponent,
  },
  {
    path: 'update/:id',
    canActivate: [AuthGuardService],
    component: UpdateEmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
