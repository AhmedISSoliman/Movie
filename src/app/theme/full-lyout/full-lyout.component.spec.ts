import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullLyoutComponent } from './full-lyout.component';

describe('FullLyoutComponent', () => {
  let component: FullLyoutComponent;
  let fixture: ComponentFixture<FullLyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullLyoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullLyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
