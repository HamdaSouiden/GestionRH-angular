import { Component, OnInit } from '@angular/core';
import { deparetment } from 'models/deparetment';
import { offre } from 'models/offre';
import { OffreService } from 'src/app/services/offre.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DeparetmentService } from 'src/app/services/deparetment.service';
import { cloneDeep } from 'lodash';



@Component({
  selector: 'app-offre-emploi',
  templateUrl: './offre-emploi.component.html',
  styleUrls: ['./offre-emploi.component.css']
})
export class OffreEmploiComponent implements OnInit {
  offres: offre[] = [];
  Data: any;
  departements: deparetment[] = [];
  filterValue: any;
  constructor(private offreserv: OffreService, private departservice: DeparetmentService) {}

  ngOnInit(): void {
    this.getallOffre();
    this.getAllDepart();
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.filterValuea.filter = filterValue.trim().toLowerCase();
  // }

  filter(event: any){
    console.log(event);
    console.log(this.offres);
    if(event != 'all'){
      this.Data = this.offres.filter((element : any) => {
        return element.idD === event
      })

    }else{
      
      this.Data = this.offres
      
    }
  }

  getAllDepart() {
    this.departservice.GetDeparetments().subscribe(
      (res: any) => {
        this.departements = res.data
      })
  }

  getallOffre(){
    this.offreserv.GetOffres()
    .subscribe( (res) => {
      this.Data = res.data;
      this.filterValue = res;
      this.offres = cloneDeep(res.data)
    });
  }

}


