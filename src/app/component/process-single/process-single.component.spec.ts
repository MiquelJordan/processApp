import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessSingleComponent } from './process-single.component';

describe('ProcessSingleComponent', () => {
  let component: ProcessSingleComponent;
  let fixture: ComponentFixture<ProcessSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
