import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiSinvehiculoComponent } from './noti-sinvehiculo.component';

describe('NotiSinvehiculoComponent', () => {
  let component: NotiSinvehiculoComponent;
  let fixture: ComponentFixture<NotiSinvehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotiSinvehiculoComponent]
    });
    fixture = TestBed.createComponent(NotiSinvehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
