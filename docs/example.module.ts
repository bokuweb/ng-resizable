import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ResizableModule } from '../';
import { Example } from './example.component';

@NgModule({
  declarations: [Example],
  imports: [BrowserModule, ResizableModule],
  bootstrap: [Example]
})
export class ExampleModule {}
