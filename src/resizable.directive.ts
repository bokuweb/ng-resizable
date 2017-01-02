import {
  Directive, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
  Input, DoCheck, OnDestroy, Renderer
} from '@angular/core';
import { ResizeHandlerComponent } from './resize-handler.component';

@Directive({
  selector: '[resizable]'
})
export class ResizableDirective implements DoCheck, OnDestroy {

  private _handler: ComponentRef<ResizeHandlerComponent>;

  constructor(
    private _vcr: ViewContainerRef,
    private _cfr: ComponentFactoryResolver,
    private _renderer: Renderer,
  ) {
  }

  private _createHandler() {
    if (this._handler) return;
    const cf = this._cfr.resolveComponentFactory(ResizeHandlerComponent);
    this._handler = this._vcr. createComponent(cf);
  }

  private _destroyHandler() {
    if (!this._handler) return;
    this._handler.destroy();
  }

  ngDoCheck() {
    // TODO: Mask create handler when it will be unnneccesary to create handler.
    const el = this._vcr.element.nativeElement;
    const position = getComputedStyle(el).position;
    if (position !== 'relative' && position !== 'absolute' && position !== 'fixed') {
      this._renderer.setElementStyle(el, 'position', 'relative');
    }
    this._createHandler();
    this._renderer.projectNodes(el, [this._handler.location.nativeElement]);
  }

  ngOnDestroy() {
    this._destroyHandler();
  }
}
