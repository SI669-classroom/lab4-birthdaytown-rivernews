import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCakePage } from './my-cake.page';

describe('MyCakePage', () => {
  let component: MyCakePage;
  let fixture: ComponentFixture<MyCakePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCakePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
