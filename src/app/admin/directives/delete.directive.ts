import { NgxSpinnerService } from 'ngx-spinner';
import { Directive, ElementRef, HostListener, Input,Output , OnInit, Renderer2, EventEmitter } from '@angular/core';
import { ProductService } from '../services/product.service';

declare var $:any; 

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective implements OnInit{

  @Input() id:string;
  @Output() updateTable : EventEmitter<any> = new EventEmitter();
  constructor(private element:ElementRef,
    private  renderer:Renderer2,
    private spinner:NgxSpinnerService,
    private productService:ProductService) { }

  ngOnInit(): void {
    
    var a = this.renderer.createElement("a");
    this.renderer.addClass(a,"btn");
    this.renderer.addClass(a,"btn-danger");
    
    var b = this.renderer.createElement("img") as HTMLImageElement;
    b.src = "../../../assets/icons/trash-icon.png";
    b.width=20;
    b.height=20;
    this.renderer.setStyle(b,"color","white");
    this.renderer.appendChild(a,b);
    this.renderer.appendChild(this.element.nativeElement,a);

  }

  @HostListener("click")
  onClick(){
    this.spinner.show("spinner1");
    let target = <HTMLSelectElement> event.target;
    this.productService.delete(this.id);
    let td = <HTMLTableCellElement> target.closest('tr').childNodes.item(1).parentElement;
    $(td).fadeOut(1000,() => {
      this.updateTable.emit();
    });
  }

}
