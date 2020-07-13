import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfPurcharseListComponent } from './pdf-purcharse-list.component';
import { PdfPurcharseListRoutingModule } from './pdf-purcharse-list-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [PdfPurcharseListComponent],
  imports: [
    CommonModule,
    PdfPurcharseListRoutingModule,
  
    SharedModule
  ]
})
export class PdfPurcharseListModule { 



}