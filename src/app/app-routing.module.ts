import { PatchPostComponent } from './home/PatchPost/PatchPost.component';
import { UserInfoComponent } from './home/user-info/user-info.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { IndexComponent } from './home/index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatAccountComponent } from './creat-account/creat-account.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { SendPostComponent } from './home/sendPost/sendPost.component';
import { ThirdLoginComponent } from './login/thirdLogin/thirdLogin.component';
import { FollowingComponent } from './home/following/following.component';
import { UserPostComponent } from './home/userPost/userPost.component';



const routes: Routes = [
  {
    path: 'thirdLogin',component: ThirdLoginComponent,pathMatch: 'full'
  },
  {
    canActivate: [AuthGuardService],
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: 'userInfo',
        component: UserInfoComponent
      },
      {
        path: 'sendPost',
        component: SendPostComponent
      },
      {
        path: 'patchPost',
        component: PatchPostComponent
      },
      {
        path: 'following',
        component: FollowingComponent
      },
      {
        path: 'userPost',
        component: UserPostComponent
      },
      {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'creatAccount', component: CreatAccountComponent },

  { path: '**', redirectTo: '/index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  })
export class AppRoutingModule { }
