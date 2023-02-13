/* import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('Pruebas del CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Card } from '../interfaces/card.interface';
import { CardComponent } from './card.component';
import { MaterialModule } from '../material/material.module';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let card: Card;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [MaterialModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    card = {
      id: 1,
      photo: 'https://example.com/1.jpg',
      text: 'Texto de ejemplo',
    };
    component.card = card;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display card title', async () => {
    fixture.whenStable().then(() => {
      const title = fixture.debugElement.query(
        By.css('mat-card-title')
      ).nativeElement;
      expect(title.textContent).toContain(card.id);
    });
  });

  it('should display card photo', () => {
    const photo = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(photo.src).toContain(card.photo);
  });
  it('should display card text', async(() => {
    fixture.whenStable().then(() => {
      const text = fixture.debugElement.query(
        By.css('mat-card-content')
      ).nativeElement;
      expect(text.textContent).toContain(card.text);
    });
  }));
});
