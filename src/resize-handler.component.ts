import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'resize-handler',
  template: `
    <div></div>
  `,
  styleUrls: ['./resize-handler.component.css'],
})
export class ResizeHandlerComponent implements OnInit {

  onHandleClick: EventEmitter<MouseEvent> = new EventEmitter(null);

  constructor() {
  }

  ngOnInit() {
  }

  @HostListener('mousedown', ['$event'])
  onMousemove(event: MouseEvent): void {
    this.onHandleClick.emit(event);
  }
}
