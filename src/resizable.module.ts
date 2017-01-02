import { NgModule } from '@angular/core';
import { ResizableDirective } from './resizable.directive';
import { ResizeHandlerComponent } from './resize-handler.component';

@NgModule({
  declarations: [ResizableDirective, ResizeHandlerComponent],
  entryComponents: [ResizeHandlerComponent],
  exports: [ResizableDirective],
})
export class ResizableModule {}
