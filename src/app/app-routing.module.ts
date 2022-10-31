import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomepageComponent } from './homepage/homepage.component';



const routes: Routes = [
  {

   path: 'auth',
   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)


  },
  {

    path: 'home',
    component:HomepageComponent,
    canActivate:[AuthGuard]
  },

  {

    path:'',pathMatch:'full',redirectTo:'auth'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
