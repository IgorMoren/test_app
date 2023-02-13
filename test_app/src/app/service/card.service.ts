import { Card } from '../interfaces/card.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private _url: string = 'http://localhost:3000/pictures/';

  constructor(private _http: HttpClient) {}

  getCards(pageNumber: number): Observable<Card[]> {
    return this._http.get<Card[]>(
      `${this._url}?_page=${pageNumber}&_limit=20`
    ) as Observable<Card[]>;
  }

  getCardsByFilterId(id: number): Observable<Card[]> {
    return this._http.get<Card[]>(`${this._url}?id=${id}`);
  }
  getCardsByFilterText(text: string): Observable<Card[]> {
    return this._http.get<Card[]>(`${this._url}?_limit=20&text_like=${text}`);
  }
}
