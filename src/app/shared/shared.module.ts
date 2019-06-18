import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRemoveModalComponent } from '../components/add-remove-modal/add-remove-modal.component';
import { SelectModelComponent } from '../components/select-model/select-model.component';

@NgModule({
  declarations: [
    AddRemoveModalComponent,
    SelectModelComponent],
  entryComponents: [
    AddRemoveModalComponent,
    SelectModelComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AddRemoveModalComponent,
    SelectModelComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
