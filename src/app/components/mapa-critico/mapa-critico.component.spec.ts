import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaCriticoComponent } from './mapa-critico.component';

describe('MapaCriticoComponent', () => {
  let component: MapaCriticoComponent;
  let fixture: ComponentFixture<MapaCriticoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapaCriticoComponent]
    });
    fixture = TestBed.createComponent(MapaCriticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
