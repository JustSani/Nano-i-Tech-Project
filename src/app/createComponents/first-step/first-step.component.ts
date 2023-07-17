import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.css']
})
export class FirstStepComponent {
  @Output() selection = new EventEmitter;
  secondStep(val: any){
    if(val)
      this.selection.emit({pagina: 1})
    else
      this.selection.emit({pagina: 2})
    
  }
}
