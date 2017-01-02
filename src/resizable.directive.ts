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
    if (position === 'relative' || position === 'absolute' || position === 'fixed') {
      this._renderer.setElementStyle(el, 'position', 'relative');
    }
    this._createHandler();
    this._renderer.projectNodes(el, [this._handler.location.nativeElement]);
  }

  ngOnDestroy() {
    this._destroyHandler();
  }
}

/*

import {LoadingBodyComponent} from "./loading-body.component";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export type LoadingKind = "container" | "parts";

@Directive({
  selector: "[loading],[waitFor]"
})
export class LoadingDirective implements DoCheck, OnDestroy {
  private _cr: ComponentRef<LoadingBodyComponent>;
  private _minHeight: string;
  private _hasView = false;
  private _loading = false;
  loading$ = new BehaviorSubject<boolean>(null);
  @Input() loadingKind: LoadingKind = "container";

  constructor(
    private _vcr: ViewContainerRef,
    private _cfr: ComponentFactoryResolver,
    private _renderer: Renderer,
  ) {}

  private _createLoadingBody() {
    if (this._cr) return;
    const cf = this._cfr.resolveComponentFactory(LoadingBodyComponent);
    this._cr = this._vcr.createComponent(cf);
    this._cr.instance.kind = this.loadingKind;
  }

  private _destroyLoadingBody() {
    if (!this._cr) return;
    this._cr.destroy();
    this._cr = null;
  }

  @Input()
  get loading() {
    return this._loading;
  }

  set loading(condition: boolean) {
    if (this._loading === condition) return;
    this._loading = condition;
    this.loading$.next(condition);
    this.
    (condition);
  }

  @Input()
  set waitFor(x: Promise<any> | Observable<any>) {
    if (!x) return;
    const done = () => this.loading = false;
    const promise = <Promise<any>>((x instanceof Observable) ? x.first().toPromise() : x);
    this.loading = true;
    promise.then(done, done);
  }

  private _update(condition: boolean) {
    const el = this._vcr.element.nativeElement;
    if (condition && !this._hasView) {
      this._hasView = true;
      this._createLoadingBody();
      this._renderer.projectNodes(el, [this._cr.location.nativeElement]);
    } else if (!condition && this._hasView) {
      this._hasView = false;
      this._destroyLoadingBody();
    }
    if (this.loadingKind === "parts") return;
    if (condition) {
      this._minHeight = this._minHeight || getComputedStyle(el).getPropertyValue("--min-height-loading");
      this._renderer.setElementStyle(el, "min-height", this._minHeight);
    } else {
      this._renderer.setElementStyle(el, "min-height", null);
    }
  }

  */
