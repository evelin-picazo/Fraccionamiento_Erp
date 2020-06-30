import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conciliacion } from 'src/app/conciliacion';
import { ConciliacionService } from 'src/app/conciliacion.service';

@Component({
  selector: 'app-conciliacion-details',
  templateUrl: './conciliacion-details.component.html',
  styleUrls: ['./conciliacion-details.component.scss']
})
export class ConciliacionDetailsComponent implements OnInit {

  id: number;
  employee: Conciliacion;  
  alertDisable = true;
  alertMessage = "null";

  constructor(private route: ActivatedRoute,private router: Router,
    private employeeService: ConciliacionService) { }

  ngOnInit() {
    this.employee = new Conciliacion();    
    this.id = this.route.firstChild.snapshot.params['id']
    console.log(this.id);
    
    
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
}