import { Component, Input } from '@angular/core';

import { Card } from '../interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class CardComponent {
  @Input() card!: Card;
}
