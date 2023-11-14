import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdboardComponent } from './userdboard.component';

describe('UserdboardComponent', () => {
  let component: UserdboardComponent;
  let fixture: ComponentFixture<UserdboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserdboardComponent]
    });
    fixture = TestBed.createComponent(UserdboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
