import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { offre } from 'models/offre';
import { DeparetmentService } from 'src/app/services/deparetment.service';
import { OffreService } from 'src/app/services/offre.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-offre',
  templateUrl: './list-offre.component.html',
  styleUrls: ['./list-offre.component.css']
})
export class ListOffreComponent implements OnInit {
  offres: offre = new offre();
  Data: any;
  depart: any;
  // getbyid: any;
  formOffre!: FormGroup;
  showAdd!: boolean;
  showUpdate!: boolean;
  errormsg: any;
  successmsg: any;

  displayedColumns: string[] = ['id', 'title', 'postes_vacants', 'type_demploi_desire', 'experience', 'niveau_detude', 'langue', 'description_emploi', 'exigences_emploi', 'date_expiration', 'Deparetment', 'action'];
  dataSource!: MatTableDataSource<offre>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private route: ActivatedRoute, private formbuilder: FormBuilder, private offreserv: OffreService, private departserv: DeparetmentService) { }

  ngOnInit(): void {
    // this.getbyid = this.route.snapshot.paramMap.get('id');
    // if(this.getbyid){
    //   this.departserv.GetDeparetmentById(this.getbyid).subscribe((res)=> {
    //     this.formOffre.patchValue({ 
    //       name: res.data.name,
    //     });
    //   })
    // }
    this.formOffre = this.formbuilder.group({
      title : [""],
      postes_vacants : [""],
      type_demploi_desire : [""],
      experience : [""],
      niveau_detude : [""],
      langue : [""],
      idD:[],
      description_emploi : [""],
      exigences_emploi : [""],
      date_expiration : [""],
    })
    this.getallOffre();
    this.getallDepart();
  }

  getallDepart(){
    this.departserv.GetDeparetments()
    .subscribe( (res) => {
      this.depart = res.data;
    });
  }

  addOffre(): void {
    if(this.formOffre.valid){
      this.offreserv.AddOffre(this.formOffre.value).subscribe(
        (res) => {
          this.formOffre.reset();
          this.getallOffre();
          this.successmsg = res.message;
        })
    }
    this.errormsg = 'field is required !';
  }

  clickAddOffre(){
    this.formOffre.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(offre: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.offres.id = offre.id;
    this.formOffre.controls["title"].setValue(offre.title),
    this.formOffre.controls["postes_vacants"].setValue(offre.postes_vacants),
    this.formOffre.controls["type_demploi_desire"].setValue(offre.type_demploi_desire),
    this.formOffre.controls["experience"].setValue(offre.experience),
    this.formOffre.controls["niveau_detude"].setValue(offre.niveau_detude),
    this.formOffre.controls["langue"].setValue(offre.langue),
    // this.formOffre.controls["deparetment"].setValue(offre.depart),
    this.formOffre.controls["description_emploi"].setValue(offre.description_emploi),
    this.formOffre.controls["exigences_emploi"].setValue(offre.exigences_emploi),
    this.formOffre.controls["date_expiration"].setValue(offre.date_expiration)
  }

  getallOffre(){
    this.offreserv.GetOffres()
    .subscribe( (res) => {
      this.Data = res.data;
      this.dataSource = new MatTableDataSource(this.Data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateOffre(): void {
    // this.offres.title = this.formOffre.value.title,
    // this.offres.postes_vacants = this.formOffre.value.postes_vacants,
    // this.offres.type_demploi_desire = this.formOffre.value.type_demploi_desire,
    // this.offres.experience = this.formOffre.value.experience,
    // this.offres.niveau_detude = this.formOffre.value.niveau_detude,
    // this.offres.langue = this.formOffre.value.langue,
    // // this.offres.depart = this.formOffre.value.depart,
    // this.offres.description_emploi = this.formOffre.value.description_emploi,
    // this.offres.exigences_emploi = this.formOffre.value.exigences_emploi,
    // this.offres.date_expiration = this.formOffre.value.date_expiration
    if(this.formOffre.valid){
      this.formOffre.get("idD")?.setValue(parseInt(this.formOffre.get("idD")?.value))
      this.offreserv.UpdateOffre(this.formOffre.value, this.offres.id).subscribe((res)=> {
          this.formOffre.reset();
          this.getallOffre();
          this.successmsg = res.message;
      });
    }else{
      this.errormsg = 'field is required !';
    }
  }

  deleteOffre(id: any): void {
    this.offreserv.DeleteOffre(id)
      .subscribe( (res) => {
        this.getallOffre();
      })
  }
}
