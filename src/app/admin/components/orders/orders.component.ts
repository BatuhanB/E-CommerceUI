import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {

  }

  spinnerMet(){
    this.spinner.show('spinner1');

    setTimeout(() => {
      this.spinner.hide('spinner1');
    }, 1500);
  }
}
