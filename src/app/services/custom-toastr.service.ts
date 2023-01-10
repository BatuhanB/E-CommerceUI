import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  constructor(private toastr: ToastrService) {}

  message(
    message: string,
    title: string,
    toastrOptions: ToastrOptions
  ) {
    this.toastr[toastrOptions.messageType](message, title, {
      positionClass: toastrOptions.position,
      closeButton:toastrOptions.closeButton,
      easing:toastrOptions.easing,
      progressBar:toastrOptions.progressBar,
      tapToDismiss:toastrOptions.tapToDismiss,
      timeOut:toastrOptions.timeOut
    });
  }
}
export interface ToastrOptions {
  messageType: ToastrMessageType;
  position: ToastrPosition;
  progressBar?: boolean;
  tapToDismiss?: boolean;
  easing?: string;
  timeOut?: number;
  closeButton?: boolean;
}

export enum ToastrMessageType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export enum ToastrPosition {
  TopRight = 'toast-top-right',
  BottomRight = 'toast-bottom-right',
  BottomLeft = 'toast-bottom-left',
  TopLeft = 'toast-top-left',
  TopFullWidth = 'toast-top-full-width',
  BottomFullWidth = 'toast-bottom-full-width',
  TopCenter = 'toast-top-center',
  BottomCenter = 'toast-bottom-center',
}
