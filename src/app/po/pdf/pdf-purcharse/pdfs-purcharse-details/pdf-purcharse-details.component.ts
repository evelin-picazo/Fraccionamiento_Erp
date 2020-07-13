
import { Purcharse } from 'src/app/purcharse';
import { Supplier } from 'src/app/supplier';
import { Payment } from 'src/app/payment';
import { ArticlesC } from 'src/app/articlesc';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PurcharseService } from 'src/app/purcharse.service';
import { SupplierService } from 'src/app/supplier.service';

import { PaytmentService } from 'src/app/paytment.service';
import * as jsPDF from 'jspdf'
import { Component, OnInit } from '@angular/core';
@Component
({
  selector: 'app-pdf-purcharse-details',
  templateUrl: './pdf-purcharse-details.component.html',
  styleUrls: ['./pdf-purcharse-details.component.scss']
})
export class PdfPurcharseDetailsComponent implements OnInit {

  cond :number;
  id: number;
  employee: Purcharse = new Purcharse();
supplier : Supplier = new Supplier();
payment : Payment = new Payment();
article:ArticlesC = new ArticlesC();


  submitted = false;
  suppliers: Observable<Supplier[]>;
  payments: Observable<Payment[]>;
  articlesc : Observable<ArticlesC[]>;
  alertDisable = true;
  alertMessage = "null";


  constructor(private route: ActivatedRoute,private router: Router,
    private employeeService: PurcharseService,
    private supplierService: SupplierService,
    private paymentService:PaytmentService
    
    ) { }


    imprimirLista(id:number){

      const doc = new jsPDF(id);
      
      doc.fromHTML(document.getElementById('from-informacion'), 10,10);;
      doc.save(['lista']);
      
      console.log(id);
  
      }


  ngOnInit() {
    this.employee = new Purcharse();    
    this.id = this.route.firstChild.snapshot.params['id']
    console.log(this.id);
    this.reloadDatas() ;
    this.reloadDatass() ;
    this.reloadDatasss() ;
    
    
    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        console.log(data);
        this.employee = data;
      }, error => {
        console.log(error);
        let coins = [];
        for (let key in error) {
          this.alertDisable = false;
          this.alertMessage = error['statusText'];          
        }

      });
  }


  reloadDatas() 
  {

    this.supplierService.getEmployeeListcombo().subscribe(
      data => {
        console.log(data);
        this.suppliers = this.supplierService.getEmployeeListcombo();
      },
      error => {
        console.log(error);
        let coins = [];
        for (let key in error) {
          this.alertDisable = false;
          this.alertMessage = error['statusText'];          
        }
      }
    );      
  }
  
  reloadDatass() 
  {

    this.paymentService.getEmployeeListcombo().subscribe(
      data => {
        console.log(data);
        this.payments = this.paymentService.getEmployeeListcombo();
      },
      error => {
        console.log(error);
        let coins = [];
        for (let key in error) {
          this.alertDisable = false;
          this.alertMessage = error['statusText'];          
        }
      }
    );      
  }





  reloadDatasss() 
  {

    this.employeeService.getEmployeeListcombo().subscribe(
      data => {
        console.log(data);
        this.articlesc = this.employeeService.getEmployeeListcombo();
      },
      error => {
        console.log(error);
        let coins = [];
        for (let key in error) {
          this.alertDisable = false;
          this.alertMessage = error['statusText'];          
        }
      }
    );      
  }
  

}
