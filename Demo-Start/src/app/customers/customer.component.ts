import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { Customer } from './customer';

function ValidateProperty(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): {[key: string]: boolean} | null => {
    if (c.valid !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {rating: true};
    }
    return null;
  };
}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  customerForm: FormGroup;
emailMessage: string;
private validationMessages = {
  required: 'Please enter your email address',
  email: 'Please enter your valid email address'
};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        emailGroup: this.fb.group({
          email: ['', Validators.nullValidator, Validators.email],
          confirmEmail: ['', Validators.required, Validators.email]
        }),
        phoneNumber: '',
        sendCatalog: true,
        notifications: 'email',
        rating: [null, ValidateProperty(1, 5)]
      });

    this.customerForm.get('notifications').valueChanges.subscribe(
        val => {
          this.NotificationSelected(val);
        }
    );
    const emailControl = this.customerForm.get('emailGroup.email');
    console.log(`control is : ${emailControl}`);
    emailControl.valueChanges.pipe(debounceTime(3000)).subscribe(value => this.setMesage(emailControl));
  }

  setMesage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
    this.emailMessage = Object.keys(c.errors).map(
     key => this.validationMessages[key]).join(' ');
    }
  }

  save() {
    console.log();
    console.log('Saved: ' );
  }

  TestDataMethod(): void {
this.customerForm.patchValue({
  firstName: 'Test',
  lastName : 'Test Last'
});
  }

  NotificationSelected(selectedValue: string): void {
    console.log(selectedValue);
    const phoneControl = this.customerForm.get('phoneNumber');
    if (selectedValue === 'text') {
      console.log(`selectedValue`);
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
