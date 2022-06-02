/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PatchPostComponent } from './PatchPost.component';

describe('PatchPostComponent', () => {
  let component: PatchPostComponent;
  let fixture: ComponentFixture<PatchPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatchPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
