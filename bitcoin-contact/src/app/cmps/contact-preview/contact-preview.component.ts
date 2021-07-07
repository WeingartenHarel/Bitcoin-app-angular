import { ChangeDetectionStrategy, Component, Input, OnInit , Output , EventEmitter  } from '@angular/core';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact
  // @Output() emitter: EventEmitter<any[]> = new EventEmitter();
  @Output() removeContact = new EventEmitter<String>()

  constructor() { }

  ngOnInit(): void {
  }

}
