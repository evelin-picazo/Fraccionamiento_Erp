
import { Component, OnInit } from '@angular/core';
import { PaymentRecord } from 'src/app/payment-record';
import { PaymentRecordService } from 'src/app/payment-record.service';
import { Router } from '@angular/router';
import { STRING_TYPE } from '@angular/compiler';
@Component({
  selector: 'app-create-payment-record',
  templateUrl: './create-payment-record.component.html',
  styleUrls: ['./create-payment-record.component.scss']
  
})
export class CreatePaymentRecordComponent implements OnInit {

  employee: PaymentRecord = new PaymentRecord();
  alertDisable = true;
  alertDisables = true;
  alertMessage = "null";
  alertMessages = "null";
  datos:String;
  
  constructor(private employeeService: PaymentRecordService,
    private router: Router) {

      
     }

    ngOnInit() {
    }

    newEmployee(): void {
      this.employee = new PaymentRecord();
    }
    

    save() {
console.log(this.employee.payment_method);
      
      console.log(this.employee);
      
      this.employeeService.createEmployee(this.employee)
        .subscribe(data => 
          {
            console.log(data);
            this.alertDisables = false;
            this.alertMessages ="Se inserto la acredor correctamente";
            this.employee= new PaymentRecord();
          }, 
        error => {
          console.log(error);    
          let coins = [];
          for (let key in error) {
            this.alertDisable = false;
            this.alertMessage = error['statusText'];          
          }      
        });
        
    }

 onSubmit() 
  {

  this.alertDisable = true;
  this.alertDisables = true;


 
  

  if(this.employee.payment_record_amount =="" ||  this.employee.payment_record_amount ==null ){
    this.alertDisable = false;
    this.alertMessage = "Monto";          
  }

 


  else{
    this.save();    
  }
 }

  gotoList() 
  {
    this.router.navigate(['payment-record-list']);
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.datos = reader.result.toString();
        this.employee.payment_method = this.datos.replace("data:application/pdf;base64,","")
      event = this.employee.payment_record_amount;
     
    };
}


  

}