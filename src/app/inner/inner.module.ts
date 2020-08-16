import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InnerPageRoutingModule } from './inner-routing.module';

import { InnerPage } from './inner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InnerPageRoutingModule
  ],
  declarations: [InnerPage]
})
export class InnerPageModule {}
