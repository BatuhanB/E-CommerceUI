import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { CustomHttpClientService } from 'src/app/services/custom-http-client.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element:ElementRef,
    private  renderer:Renderer2,
    private client:CustomHttpClientService) { 
      var a = renderer.createElement("a");
      a.setAttribute("style","cursor:pointer;width:25px;height:25px;color:red;");
      var b = renderer.createElement("fa-icon");
      b.setAttribute("icon","trashIcon");
      a.appendChild(b);
      renderer.appendChild(element.nativeElement,a);
    }

}
