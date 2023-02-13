import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { CardService } from './service/card.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule, ReactiveFormsModule],
      declarations: [AppComponent],
      providers: [CardService],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'test_app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('test_app');
  });
});
