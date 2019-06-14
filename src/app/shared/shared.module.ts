import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRemoveModalComponent } from '../components/add-remove-modal/add-remove-modal.component';

@NgModule({
  declarations: [
    AddRemoveModalComponent],
  entryComponents: [
    AddRemoveModalComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AddRemoveModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
