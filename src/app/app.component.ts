import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
  // Formulario #1: Datos del inmueble
  public propertyForm: FormGroup = this.fb.group({
    houseName:         ['', Validators.required],
    parkNumber:        ['', Validators.required],
    adress:            ['', Validators.required],
    depositNumber:     ['', Validators.required],
    neighbourhood:     ['', Validators.required],
    propertyType:      ['', Validators.required],
    // Continuar con el resto
  });



  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this.fb.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private fb: FormBuilder, 
    breakpointObserver: BreakpointObserver
  ) 
  {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  showForm()
  {
    console.log(this.propertyForm.value);
  }
}
