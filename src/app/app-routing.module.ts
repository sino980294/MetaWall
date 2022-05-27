import { LayoutComponent } from './layout/layout/layout.component';
import { IndexComponent } from './home/index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatAccountComponent } from './creat-account/creat-account.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
{
  canActivate:[AuthGuardService],
  path:'',
  component: LayoutComponent,
  children:[
    {
      path:'index',
      component:IndexComponent
    },
    {
      path:'',
      redirectTo:'/index',
      pathMatch:'full'
    }
  ]
},

  { path: 'login', component: LoginComponent },
  { path: 'creatAccount', component: CreatAccountComponent },

  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
