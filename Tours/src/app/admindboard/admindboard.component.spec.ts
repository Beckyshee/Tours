import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindboardComponent } from './admindboard.component';

describe('AdmindboardComponent', () => {
  let component: AdmindboardComponent;
  let fixture: ComponentFixture<AdmindboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindboardComponent]
    });
    fixture = TestBed.createComponent(AdmindboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
