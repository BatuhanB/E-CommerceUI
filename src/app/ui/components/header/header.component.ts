import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../../services/custom-toastr.service';
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
  constructor(private customToastrService:CustomToastrService) {}


    showSuccess(){
      this.customToastrService.message("Congratulations your service is working!","Successfull!",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.BottomRight,
        closeButton:true,
        progressBar:true,
        timeOut:1500
      });
    }

    showError(){
      this.customToastrService.message("Congratulations your service is working!","Successfull!",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.BottomCenter,
        closeButton:true,
        progressBar:true,
        timeOut:2500
      });
    }
  // showSuccess() {
  //   this.toastrService.success('This is a test message', 'Test Message', {
  //     progressBar: true,
  //     tapToDismiss: true,
  //     easing: 'ease-in',
  //     timeOut: 2000,
  //     closeButton: true,
  //   });
  // }
  // showError() {
  //   this.toastrService.error('This is a test message', 'Test Message', {
  //     progressBar: true,
  //     tapToDismiss: true,
  //     easing: 'ease-in',
  //     timeOut: 2000,
  //     closeButton: true,
  //   });
  // }


}
