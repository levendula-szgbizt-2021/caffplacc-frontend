import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCaffComponent } from './my-caff.component';

describe('MyCaffComponent', () => {
  let component: MyCaffComponent;
  let fixture: ComponentFixture<MyCaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
