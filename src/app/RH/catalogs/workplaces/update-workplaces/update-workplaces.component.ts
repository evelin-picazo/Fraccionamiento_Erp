import { Component, OnInit } from '@angular/core';
import { WorkplacesService } from 'src/app/workplaces.service';
import { Workplaces } from 'src/app/workplaces';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-workplaces',
  templateUrl: './update-workplaces.component.html',
  styleUrls: ['./update-workplaces.component.scss']
})
export class UpdateWorkplacesComponent implements OnInit {

  id: number;
  workplace: Workplaces;
  alertDisable = true;
  alertDisables = true;
  alertMessage = "null";
  alertMessages = "null";

  constructor(private route: ActivatedRoute,private router: Router,
    private workplaceService: WorkplacesService) { }

  ngOnInit() {
    this.workplace = new Workplaces();

    this.id = this.route.firstChild.snapshot.params['id']
    console.log(this.workplace.workplaces_status);
    this.workplaceService.getWorkplace(this.id)
      .subscribe(data => {
        console.log(data);
        this.workplace = data;
        this.workplace.workplaces_status = (String(this.workplace.workplaces_status) == "false") ? null:"false";
        console.log(this.workplace.workplaces_status);
      }, error => {
        console.log(error);let coins = [];
        for (let key in error) {
          this.alertDisable = false;
          this.alertMessage = error['statusText'];          
        }
        
      });
  }


  updateWorkplace() {    
    this.workplace.last_update_by=17;
    console.log(this.workplace);
    console.log(this.id);
       
    this.workplaceService.updateWorkplace(this.id, this.workplace)
      .subscribe(data => {console.log(data);
        this.alertDisables = false;
        this.alertMessages ="Se actualizo el puesto correctamente";
        this.gotoList();  
      }, 
      error => {
        console.log(error);
        let coins = [];
        for (let key in error) {
          this.alertDisable = false;
          this.alertMessage = "Dato duplicado"          
        }
      });
  
  }

  onSubmit() {
    this.alertDisable = true;
    this.alertDisables = true;
    
    if(this.workplace.workplaces_name =="" ||  this.workplace.workplaces_name ==null ){
      this.alertDisable = false;
      this.alertMessage = "Agregar nombre de puesto";          
    }
    else{
      this.updateWorkplace();    
    }
  }

  gotoList() {
    this.router.navigate(['workplaces-list']);
  }


}
