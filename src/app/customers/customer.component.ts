import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Customer } from './customer';

function ratingRange(min:number, max:number): ValidatorFn{
return (c: AbstractControl): { [key: string]: boolean } | null => {
  if (c.value !== null && (isNaN (c.value) || c.value < min || c.value > max)) {
  return { 'range': true };
  }
  return null;
  }
}

function emailMatcher (c: AbstractControl): { [key: string]: boolean } | null{
  const emailControl = c.get ('email');
  const confirmControl = c.get ('confirmEmail');
  if(emailControl.pristine  || confirmControl.pristine){
    return null;
  }
  if (emailControl.value === confirmControl.value) {
  return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(3)]],
      lastName: ['',[Validators.required,Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['',[Validators.required,Validators.email]],
        confirmEmail: ['',Validators.required],
      },{validator:emailMatcher}),
      phone:"",
      notification:"email",
      sendCatalog: true,
      rating: [null,ratingRange(1,5)]
      // addressType: new FormControl(),
      // street1: new FormControl(),
      // street2: new FormControl(),
      // city: new FormControl(),
      // state: new FormControl(),
      // zip: new FormControl(),
    });
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm));
  }
  populateTestData(): void{
    this.customerForm.patchValue({
      // firstName:"Hari",
      lastName:"Jack",
      email:"hari.kande@gmail.com",
      sendCatalog:false
    })
  }

  setNotification(notfyVia: string):void {
    const phoneControl = this.customerForm.get('phone');
    if(notfyVia === 'text'){
      phoneControl.setValidators(Validators.required);
    }
    else{
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
