import { Component, OnInit } from '@angular/core';
import { Legals } from 'src/app/services/admin/legals';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalsService } from 'src/app/services/admin/legals.service';


@Component({
  selector: 'app-update-legals',
  templateUrl: './update-legals.component.html',
  styleUrls: ['./update-legals.component.scss']
})
export class UpdateLegalsComponent implements OnInit {

  id: number;
  employee: Legals;
  alertDisable = true;
  alertDisables = true;
  alertMessage = "null";
  alertMessages = "null";
  
  constructor(private route: ActivatedRoute,private router: Router,
    private employeeService: LegalsService) { }

  ngOnInit() {

    this.employee = new Legals();
    this.id = this.route.firstChild.snapshot.params['id']
    console.log(this.employee.legals_status);
    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        console.log(data);
        this.employee = data;
        this.employee.legals_status = (String(this.employee.legals_status) == "false") ? null:"false";
        console.log(this.employee.legals_status);
      }, error => {
        console.log(error);let coins = [];
        for (let key in error) {
          this.alertDisable = false;
          this.alertMessage = error['statusText'];          
        }
        
      });
  }

   

  updateEmployee() {

    this.employee.userid="3";
    console.log(this.employee.legals_status);
    
    this.employeeService.updateEmployee(this.id, this.employee)
      .subscribe(data => {
        console.log(data);
        this.alertDisables = false;
        this.alertMessages ="Se actualizo la empresa correctamente";
        this.gotoList();
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

  onSubmit() {
    

    this.alertDisable = true;
    this.alertDisables = true;
  
    if(this.employee.legals_name =="" ||  this.employee.legals_name ==null ){
      this.alertDisable = false;
      this.alertMessage = "Nombre Incompleto";          
    }
  
    else if(this.employee.legals_address =="" ||  this.employee.legals_address ==null ){
      this.alertDisable = false;
      this.alertMessage = "Dirección Incompleta";          
    }
  
    else if(this.employee.legals_description =="" ||  this.employee.legals_description ==null ){
      this.alertDisable = false;
      this.alertMessage = "Descripción Incompleta";          
    }
  
  
    else if(this.employee.legals_rfc =="" ||  this.employee.legals_rfc ==null ){
      this.alertDisable = false;
      this.alertMessage = "RFC Incompleta";          
    }
  
    else if(this.employee.legals_employer_registration =="" ||  this.employee.legals_employer_registration ==null ){
      this.alertDisable = false;
      this.alertMessage = "Registro Patronal Incompleta";          
    }
  
    else if(this.employee.legals_tax_regime =="" ||  this.employee.legals_tax_regime ==null ){
      this.alertDisable = false;
      this.alertMessage = "Regimen Fiscal Incompleta";          
    }
  
  
    else{
      this.updateEmployee();  
    }


  }

  gotoList() {
    this.router.navigate(['legals-list']);
  }

}
