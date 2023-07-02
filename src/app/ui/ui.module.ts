import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponent } from './ui.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UiComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ],
  exports:[
    UiComponent,
    ComponentsModule
  ]
})
export class UiModule { }
