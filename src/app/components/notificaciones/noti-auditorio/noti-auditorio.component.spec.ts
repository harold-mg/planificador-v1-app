import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiAuditorioComponent } from './noti-auditorio.component';

describe('NotiAuditorioComponent', () => {
  let component: NotiAuditorioComponent;
  let fixture: ComponentFixture<NotiAuditorioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotiAuditorioComponent]
    });
    fixture = TestBed.createComponent(NotiAuditorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
