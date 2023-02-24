import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { candidature } from 'models/candidature';
import { entretien } from 'models/entretien';
import { CandidatureService } from 'src/app/services/candidature.service';
import { EntretienService } from 'src/app/services/entretien.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list-candidature',
  templateUrl: './list-candidature.component.html',
  styleUrls: ['./list-candidature.component.css']
})
export class ListCandidatureComponent implements OnInit {
  candidatures: candidature = new candidature();
  entretiens: entretien = new entretien();
  readData: any = [];
  formEntretien!: FormGroup;
  errormsg: any;
  successmsg: any;
  emailcandidat: string =""

  displayedColumns: string[] = ['id', 'name', 'email', 'position', 'lettre_motivation', 'offre', 'CV', 'createdAt', 'updatedAt', 'action'];
  dataSource!: MatTableDataSource<candidature>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formbuilder: FormBuilder, private candidatService: CandidatureService, private entretienserv: EntretienService, private tokenservice: TokenStorageService) { }

  ngOnInit() {
    this.formEntretien = this.formbuilder.group({
      from: [""],
      to: [""],
      subject: [""],
      message: [""]
    })
    this.getallCandidat();
  }

  addEntretien(): void {
    if (this.formEntretien.valid) {
      this.entretienserv.CreateEntretien(this.formEntretien.value).subscribe(
        (res) => {
          this.formEntretien.reset();
          this.successmsg = res.message;
        })
    }
    this.errormsg = 'field is required !';
  };

  getallCandidat() {
    this.candidatService.GetCandidatures()
      .subscribe((res) => {
        this.readData = res.data;
        this.dataSource = new MatTableDataSource(this.readData);
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

  vueCV(cv: string, action:string) {
    let filename: any
    if(cv) filename = cv?.split('\\')?.pop()?.split('/').pop();
    fetch("http://localhost:7001/file/" + cv, {
      headers: new Headers({ Origin: location.origin, responseType: 'blob' }),
      mode: 'cors',
    })
      .then((response) => response.blob())
      .then((blob) => {
        if (action == 'Vis') {
          window.open("http://localhost:7001/file/" + cv, '_blank');
        } else {
          let blobUrl = window.URL.createObjectURL(blob);
          this.forceDownload(blobUrl, filename);
        }
      }).catch((e) => console.error(e));
  }

  private forceDownload(blob:any, filename:string) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  
  deleteCandidat(id: any): void {
    this.candidatService.DeleteCandidature(id)
      .subscribe((res) => {
        this.getallCandidat();
      })
  };

  setItem(email: string){
    this.formEntretien.get('to')?.setValue(email)
    const user = this.tokenservice.getUser()
    this.formEntretien.get('from')?.setValue(user.email)
  }
}
