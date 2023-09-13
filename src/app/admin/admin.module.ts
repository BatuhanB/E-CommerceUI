import { ComponentsModule } from './layout/components/components.module';
import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDirective } from './directives/delete.directive';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule
  ],
  exports:[
    LayoutModule
  ]
})
export class AdminModule { }
