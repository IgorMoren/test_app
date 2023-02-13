/* import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
 */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Card } from '../interfaces/card.interface';
import { CardService } from './card.service';
import { TestBed } from '@angular/core/testing';

describe('CardService', () => {
  let service: CardService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService],
    });

    service = TestBed.get(CardService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all cards', () => {
    const pageNumber = 1;
    const mockCards: Card[] = [
      { id: 1, photo: 'card1.jpg', text: 'This is card 1' },
      { id: 2, photo: 'card2.jpg', text: 'This is card 2' },
    ];

    service.getCards(pageNumber).subscribe((cards) => {
      expect(cards).toEqual(mockCards);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/pictures/?_page=${pageNumber}&_limit=20`
    );
    req.flush(mockCards);
  });

  it('should get cards by id filter', () => {
    const id = 1;
    const mockCards: Card[] = [
      { id: 1, photo: 'card1.jpg', text: 'This is card 1' },
    ];

    service.getCardsByFilterId(id).subscribe((cards) => {
      expect(cards).toEqual(mockCards);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/pictures/?id=${id}`
    );
    req.flush(mockCards);
  });

  it('should get cards by text filter', () => {
    const text = 'card 1';
    const mockCards: Card[] = [
      { id: 1, photo: 'card1.jpg', text: 'This is card 1' },
    ];

    service.getCardsByFilterText(text).subscribe((cards) => {
      expect(cards).toEqual(mockCards);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/pictures/?_limit=20&text_like=${text}`
    );
    req.flush(mockCards);
  });
});
