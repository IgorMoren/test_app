import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Card } from './interfaces/card.interface';
import { CardService } from './service/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'test_app';

  currentPage = 1;

  cards: Card[] = [];

  noData: boolean = false;

  myIdForm: FormGroup;
  myTextForm: FormGroup;

  constructor(private _cardService: CardService, public fb: FormBuilder) {
    this.myIdForm = this.fb.group({
      id: ['', Validators.required],
    });
    this.myTextForm = this.fb.group({
      text: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._cardService.getCards(this.currentPage).subscribe((cards) => {
      this.cards = cards;
    });
  }
  filterById() {
    this.cards = [];
    this.noData = false;

    const id = this.myIdForm.value.id;
    if (!id) {
      return;
    }
    this._cardService.getCardsByFilterId(id).subscribe((cards) => {
      this.cards = cards;
    });
    this.myIdForm.reset();
    this.myIdForm.get('id')?.setErrors(null);
    if (this.cards.length === 0) {
      this.noData = true;
    }
  }

  filterByText() {
    this.cards = [];
    this.noData = false;
    const text = this.myTextForm.value.text;
    if (!text) {
      return;
    }
    this._cardService.getCardsByFilterText(text).subscribe((card) => {
      this.cards = card;
    });
    this.myTextForm.reset();
    this.myTextForm.get('text')?.setErrors(null);
    if (this.cards.length === 0) {
      this.noData = true;
    }
  }

  reset() {
    this.cards = [];
    this._cardService.getCards(this.currentPage).subscribe((cards) => {
      this.cards = cards;
    });
    this.myTextForm.get('text')?.setErrors({});
    this.myIdForm.get('id')?.setErrors({});
  }

  onScroll(): void {
    this._cardService
      .getCards(++this.currentPage)
      .subscribe((cards: Card[]) => {
        this.cards.push(...cards);
      });
  }
}
