import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionFormElComponent } from './instruction-form-el.component';

describe('InstructionFormElComponent', () => {
  let component: InstructionFormElComponent;
  let fixture: ComponentFixture<InstructionFormElComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionFormElComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructionFormElComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
