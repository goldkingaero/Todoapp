import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared.module';




@NgModule({
  declarations: [
    AuthComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ModalModule.forRoot(),
    SharedModule

  ]
})
export class AuthModule { }
