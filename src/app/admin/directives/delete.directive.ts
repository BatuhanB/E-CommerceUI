import { NgxSpinnerService } from 'ngx-spinner';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  OnInit,
  Renderer2,
  EventEmitter,
} from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Output() updateTable: EventEmitter<any> = new EventEmitter();
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    var a = this.renderer.createElement('a');
    this.renderer.addClass(a, 'btn');
    this.renderer.addClass(a, 'btn-danger');

    var b = this.renderer.createElement('img') as HTMLImageElement;
    b.src = '../../../assets/icons/trash-icon.png';
    b.width = 20;
    b.height = 20;
    this.renderer.setStyle(b, 'color', 'white');
    this.renderer.appendChild(a, b);
    this.renderer.appendChild(this.element.nativeElement, a);
  }

  @HostListener('click')
  async onClick() {
    this.openDialog(async () => {
      this.spinner.show('spinner1');
      await this.productService.delete(this.id);
      let td = HTMLTableCellElement = this.element.nativeElement;
      $(td).animate(
        {
          opacity: 0,
          left: '+=50',
          height: 'toogle',
        },
        800,
        () => {
          this.updateTable.emit();
        }
      );
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: new DeleteDialogProductData(this.name, false),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.state == true) {
        afterClosed();
      }
    });
  }
}

export class DeleteDialogProductData {
  name: string;
  state: boolean;
  constructor(name: string, state: boolean) {
    this.name = name;
    this.state = state;
  }
}
