import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Customer } from './customer';

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
      email: ['',[Validators.required,Validators.email]],
      sendCatalog: true,
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
}
