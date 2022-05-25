import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
// import {Component} from '@angular/core';
// import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
  public disablePublicServices: boolean = false;

  // Formulario #1: Datos del inmueble
  public propertyForm: FormGroup = this.fb.group({
    houseName:         ['', Validators.required],
    parkNumber:        [''],
    depositNumber:     [''],
    adress:            ['', Validators.required],
    neighbourhood:     ['', Validators.required],
    propertyType:      ['', Validators.required],
    propertyUse:       ['', Validators.required], 
    comercialActivity: ['', Validators.required],
    withIva:           ['', Validators.required],
    canonPrice:        [0, [ Validators.required, Validators.min(1)]],
    ivaPrice:          [{value: 0, disabled: true}, Validators.required],
    admonPrice:        [0, [ Validators.required, Validators.min(0)]],
    totalPrice:        [{value: 0, disabled: true}, [ Validators.required, Validators.min(1)]],
    contractType:      ['', Validators.required],
    publicServices:    [[], Validators.required]
    // Continuar con el resto
  });

  // Formulario #2: Datos de la vigencia
  public vigencyForm: FormGroup = this.fb.group({
    contractTerm:      ['', Validators.required],
    contractStartDate: ['', Validators.required],
    contractEndDate:   ['', Validators.required],
    safeName:          ['', Validators.required], 
    applicationNumber: ['', Validators.required],
    advanceMoney:      [''],
    annualIcrease:     ['', Validators.required],
    observations:      ['']
  });

  public householderInformation = this.fb.group({
    customerType:           ['', Validators.required],
    householderName:        ['', Validators.required],
    idNumber:               ['', Validators.required],
    expeditionPlace:        ['', Validators.required],
    agentName:              ['', Validators.required],
    idAgent:                ['', Validators.required],
    expeditionPlaceIdAgent: ['', Validators.required],
    householderPhone:       ['', Validators.required],
    householderAdress:                 ['', Validators.required],    
    householderEmail:       ['', Validators.required]
    // Continuar con el resto
  });

  public cosignerInformation = this.fb.group({
    customerType:           ['', Validators.required],
    cosignerName:           ['', Validators.required],
    idNumber:               ['', Validators.required],
    expeditionPlace:        ['', Validators.required],
    agentName:              ['', Validators.required],
    idAgent:                ['', Validators.required],
    expeditionPlaceIdAgent: ['', Validators.required],
    cosignerPhone:       ['', Validators.required],
    cosignerAdress:                 ['', Validators.required],    
    cosignerEmail:       ['', Validators.required]
    // Continuar con el resto
  });

  public ownerInformation = this.fb.group({
    documentType:           ['', Validators.required],
    idNumber:               ['', Validators.required],
    birthDay:               ['', Validators.required],
    VIP:                    ['', Validators.required],
    firstName:              ['', Validators.required],
    secondName:             ['', Validators.required],
    surName:                ['', Validators.required],
    secondSurname:          ['', Validators.required],
    expeditionPlaceIdAgent: ['', Validators.required],
    cosignerPhone:          ['', Validators.required],
    expeditionPlace:        ['', Validators.required],
    cosignerAdress:         ['', Validators.required],    
    cosignerEmail:          ['', Validators.required]
    // Continuar con el resto
  });

  public admonInformation = this.fb.group({
    documentType:           ['', Validators.required],
    idNumber:               ['', Validators.required],
    birthDay:               ['', Validators.required],
    VIP:                    ['', Validators.required],
    firstName:              ['', Validators.required],
    secondName:             ['', Validators.required],
    surName:                ['', Validators.required],
    expeditionPlace:        ['', Validators.required],
    secondSurname:          ['', Validators.required],
    expeditionPlaceIdAgent: ['', Validators.required],
    cosignerPhone:          ['', Validators.required],
    cosignerAdress:         ['', Validators.required],    
    cosignerEmail:          ['', Validators.required]
    // Continuar con el resto
  });
  stepperOrientation!: Observable<StepperOrientation>;

  constructor(
    private fb: FormBuilder, 
    private breakpointObserver: BreakpointObserver
  ) 
  {
    this.loadSettings();
  }

  loadSettings()
  {
    // Responsive de steppers
    this.stepperOrientation = this.breakpointObserver
          .observe('(min-width: 800px)')
          .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    // Escuchar el campo destinación del inmueble y si es vivienda 
    // se desactiva el campo actividad comercial
    this.propertyForm.get('propertyUse')?.valueChanges.subscribe(
      value => {
        if( value === 'vivienda' ) // Desactiva el campo actividad comercial.
        {
          const comercialActivity = this.propertyForm.get('comercialActivity');
          comercialActivity?.clearValidators();
          comercialActivity?.disable();
        }
      }
    );

    // Escuchar cuando la opción de los servicios públicos cambien
    // this.propertyForm.get('publicServices')?.valueChanges.subscribe((value: string[]) => {
    //   const index = value.findIndex( p => p === "ninguno" );
    //   if(index !== -1) // si ninguno está seleccionado
    //   {
    //     this.disablePublicServices = true;
    //     this.propertyForm.patchValue({
    //       publicServices: ['ninguno']
    //     });
    //   }
    //   console.log(value);
    // });

  }

  refreshTotal()
  {
    const canonValue = this.propertyForm.get('canonPrice')?.value;
    const admonValue = this.propertyForm.get('admonPrice')?.value;
    const ivaValue = this.propertyForm.get('ivaPrice')?.value;
    const withIva = this.propertyForm.get('withIva')?.value;

    if(withIva == 'yes')
    {
      this.propertyForm.patchValue({
        ivaPrice: ( canonValue * 0.19 )
      });
    }

    this.propertyForm.patchValue({
      totalPrice: (canonValue + admonValue + ivaValue)
    });

  }

  verifyChange(value: string[])
  {
      const index = value.findIndex( p => p === "ninguno" );
      if(index !== -1) // si ninguno está seleccionado
      {
        this.disablePublicServices = true;
        this.propertyForm.patchValue({
          publicServices: ['ninguno']
        });
      }
      else
      {
        this.disablePublicServices = false;
      }
      console.log(value);
  } 

  showForm()
  {
    console.log(this.propertyForm.value);
  }
}
