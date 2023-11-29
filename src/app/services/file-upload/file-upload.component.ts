import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './../custom-toastr.service';
import { Component, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { CustomHttpClientService } from '../custom-http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Input() options: Partial<FileUploadOptions>;
  public files: NgxFileDropEntry[];

  constructor(
    private http: CustomHttpClientService,
    private toastr: CustomToastrService
  ) {}

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData: FormData = new FormData();
    files.forEach((file) => {
      (file.fileEntry as FileSystemFileEntry).file((_file) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    });

    this.http
      .post(
        {
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ responseType: 'blob' }),
        },
        fileData
      )
      .subscribe(
        (data) => {
          this.toastr.message(
            'Files Uploaded!',
            'Successfull!',
            {
              closeButton: true,
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.BottomRight,
              timeOut: 1500,
            }
          );
        },
        (error: HttpErrorResponse) => {
          const message = error.message;
          this.toastr.message(message, "Error!", {
            closeButton: true,
            messageType: ToastrMessageType.Error,
            timeOut: 1500,
            position: ToastrPosition.BottomRight,
            tapToDismiss: true,
          });
        }
      );
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  description?: string;
  accept?: string;
}
