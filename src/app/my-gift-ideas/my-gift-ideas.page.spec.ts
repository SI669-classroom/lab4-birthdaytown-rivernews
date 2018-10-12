import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGiftIdeasPage } from './my-gift-ideas.page';

describe('MyGiftIdeasPage', () => {
  let component: MyGiftIdeasPage;
  let fixture: ComponentFixture<MyGiftIdeasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGiftIdeasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGiftIdeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
