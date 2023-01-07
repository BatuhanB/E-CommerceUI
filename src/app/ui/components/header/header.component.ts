import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    // this.showSuccess();
  }
  constructor(private toastrService: ToastrService) {}

  showSuccess() {
    this.toastrService.success('This is a test message', 'Test Message', {
      progressBar: true,
      tapToDismiss: true,
      easing: 'ease-in',
      timeOut: 2000,
      closeButton: true,
    });
  }
  showError() {
    this.toastrService.error('This is a test message', 'Test Message', {
      progressBar: true,
      tapToDismiss: true,
      easing: 'ease-in',
      timeOut: 2000,
      closeButton: true,
    });
  }
}
