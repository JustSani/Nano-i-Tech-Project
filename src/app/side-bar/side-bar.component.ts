import { Component, EventEmitter, Input, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @Input() selectionNum: any;

  @Output() newValue = new EventEmitter();

  ngOnInit(){
    this.selectionNum = 0;
  }
  nuovo(){
    this.selectionNum = 0;
    this.newValue.emit(this.selectionNum)
  }
  reports(){
    this.selectionNum = 1;
    this.newValue.emit(this.selectionNum)
  }
}
