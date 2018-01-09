import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInitiativeComponent } from './new-initiative.component';

describe('NewInitiativeComponent', () => {
  let component: NewInitiativeComponent;
  let fixture: ComponentFixture<NewInitiativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInitiativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
