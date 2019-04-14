import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'contact-widget',
  templateUrl: './contact-widget.component.html',
  styleUrls: ['./contact-widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
