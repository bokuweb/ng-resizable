/// <reference path="../node_modules/@types/es6-shim/index.d.ts" />

import 'zone.js/dist/zone';
import 'es6-shim';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ExampleModule } from './example.module';

declare var ENV: string;
if (ENV === 'production') {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(ExampleModule);
