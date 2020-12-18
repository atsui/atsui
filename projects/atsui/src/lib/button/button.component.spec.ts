import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsuiButtonComponent } from './button.component';

describe('AtsuiButtonComponent', () => {
  let component: AtsuiButtonComponent;
  let fixture: ComponentFixture<AtsuiButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtsuiButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtsuiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
