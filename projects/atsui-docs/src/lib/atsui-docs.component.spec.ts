import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsuiDocsComponent } from './atsui-docs.component';

describe('AtsuiDocsComponent', () => {
  let component: AtsuiDocsComponent;
  let fixture: ComponentFixture<AtsuiDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtsuiDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtsuiDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
