import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlComponent } from './form-control.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl } from '@angular/forms';

describe('FormControlComponent', () => {
  let component: FormControlComponent;
  let fixture: ComponentFixture<FormControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormControlComponent],
      imports: [SharedModule]
    });
    let control = new FormControl('');
    fixture = TestBed.createComponent(FormControlComponent);
    component = fixture.componentInstance;
    component.control = control;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value on writeValue', () => {
    const newValue = 'New Value';
    component.writeValue(newValue);

    expect(component.innerValue).toEqual(newValue);
  });

  describe('Form control configuration', () => {
    it('should throw the error "Without append to show, set a value to appendIcon or set hasAppend = false." when trying to show append without an icon',
      () => {
        component.hasAppend = true;

        expect(() => {
          component.validateControlConfig();
        }).toThrow(new Error('Without append to show, set a value to appendIcon or set hasAppend = false.'));
      }
    );
  });

});
