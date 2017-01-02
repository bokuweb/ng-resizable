import {
  Directive, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
  Optional, Input, DoCheck, OnDestroy, Renderer, HostListener,
} from '@angular/core';
import { ResizeHandlerComponent } from './resize-handler.component';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

interface OriginProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Directive({
  selector: '[resizable]'
})
export class ResizableDirective implements DoCheck, OnDestroy {

  @Optional() @Input() minWidth = 0;

  private _isResizing = false;
  private _handler: ComponentRef<ResizeHandlerComponent>;
  // private _mousedown$: Subject<MouseEvent> = new Subject();
  private _origin: OriginProps;

  constructor(
    private _vcr: ViewContainerRef,
    private _cfr: ComponentFactoryResolver,
    private _renderer: Renderer,
  ) {
  }

  private _createHandler() {
    // if (this._handler) return;
    this._vcr.clear();
    const cf = this._cfr.resolveComponentFactory(ResizeHandlerComponent);
    this._handler = this._vcr.createComponent(cf);
    this._handler.instance.onHandleClick.subscribe(this._onResizeStart.bind(this));
    this._vcr.element.nativeElement.appendChild(this._handler.location.nativeElement);
  }

  private _destroyHandler() {
    if (!this._handler) return;
    this._handler.destroy();
  }

  private _onResizeStart(event: MouseEvent) {
    console.log('resize start');

    const el = this._vcr.element.nativeElement;
    const { width, height } = getComputedStyle(el);
    this._isResizing = true;
    this._origin = {
      x: event.clientX,
      y: event.clientY,
      width: ~~width.replace('px', ''),
      height: ~~height.replace('px', ''),
    }
  }

  ngDoCheck() {
    console.log(this.minWidth)
    // TODO: Mask create handler when it will be unnneccesary to create handler.
    const el = this._vcr.element.nativeElement;
    const position = getComputedStyle(el).position;
    if (position !== 'relative' && position !== 'absolute' && position !== 'fixed') {
      this._renderer.setElementStyle(el, 'position', 'relative');
    }
    this._createHandler();
  }

  ngOnDestroy() {
    this._destroyHandler();
  }

  @HostListener('document:mousemove', ['$event'])
  private _onMousemove(event: MouseEvent): void {
    if (!this._isResizing) return;
    const el = this._vcr.element.nativeElement;
    const diffX = event.clientX - this._origin.x;
    const diffY = event.clientY - this._origin.y;
    this._renderer.setElementStyle(el, 'width', `${this._origin.width + diffX}px`);
    this._renderer.setElementStyle(el, 'height', `${this._origin.height + diffY}px`);
  }

  @HostListener('document:mouseup', ['$event'])
  private _onMouseUp(event: MouseEvent): void {
    this._isResizing = false;
  }
}
