import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsuiExamplesComponent } from './atsui-examples.component';

describe('AtsuiExamplesComponent', () => {
  let component: AtsuiExamplesComponent;
  let fixture: ComponentFixture<AtsuiExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtsuiExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtsuiExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
