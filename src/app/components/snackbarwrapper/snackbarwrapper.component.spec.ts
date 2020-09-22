import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarwrapperComponent } from './snackbarwrapper.component';

describe('SnackbarwrapperComponent', () => {
  let component: SnackbarwrapperComponent;
  let fixture: ComponentFixture<SnackbarwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
