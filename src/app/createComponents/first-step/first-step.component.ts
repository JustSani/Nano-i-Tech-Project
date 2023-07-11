import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.css']
})
export class FirstStepComponent {
  @Output() selection = new EventEmitter;
  secondStep(val: any){
    this.selection.emit(val)
  }
}
