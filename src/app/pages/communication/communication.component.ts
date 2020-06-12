import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-communication',
  template: `<nb-layout><nb-layout-column><router-outlet></router-outlet></nb-layout-column></nb-layout>`,
  styles: [],
})
export class CommunicationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
