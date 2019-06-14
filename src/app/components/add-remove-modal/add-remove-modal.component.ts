import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-remove-modal',
  templateUrl: './add-remove-modal.component.html',
  styleUrls: ['./add-remove-modal.component.scss'],
})
export class AddRemoveModalComponent implements OnInit {

  items: any[] = [];
  @Input() type: string = '';

  constructor(private modalContoller: ModalController) { }

  ngOnInit() {
    this.initializeItems();
  }

  closeModal() {
    this.modalContoller.dismiss();
  }

  addAdmin() {

  }

  // initialize the items with false

  initializeItems() {
    this.items = [{ item: 'Ram', isChecked: false }, { item: 'gopi', isChecked: false }, { item: 'dravid', isChecked: false }];
  }

  filterItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.items = this.items.filter((item) => {
        return (item.item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

}
