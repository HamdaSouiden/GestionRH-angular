import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { offre } from 'models/offre';
import { OffreService } from 'src/app/services/offre.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidatureService } from 'src/app/services/candidature.service';
import { candidature } from 'models/candidature';

@Component({
  selector: 'app-offre-item',
  templateUrl: './offre-item.component.html',
  styleUrls: ['./offre-item.component.css']
})
export class OffreItemComponent implements AfterViewInit, OnInit {
  offres: offre = new offre();
  candidatures: candidature = new candidature();
  Data: any;
  candidatForm !: FormGroup;
  getbyid: any;
  file: any;
  openmodale: boolean =false

  constructor(private route: ActivatedRoute, private router:Router, private formbuilder: FormBuilder, private offreserv: OffreService, private candidatService: CandidatureService) { }

  ngAfterViewInit(): void {
    this.getbyid = this.route.snapshot.paramMap.get('id');
    this.offreserv.GetOffreById(this.getbyid).subscribe((res) => {
      this.offres = res.data;
      console.log(this.offres);
    })
  }

  ngOnInit(): void {
    this.candidatForm = this.formbuilder.group({
      name : [""],
      email : [""],
      position : [""],
      lettre_motivation : [""],
      idO: [],
      cv : [""]
    })
    this.getallOffre();
  }
  // cv: any;
  // onFileSelect(input:any) {
  //   if (input.files && input.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.cv = e.target.result;
  //     }
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }

  // candidatForm = new FormGroup({
  //   'name': new FormControl('', Validators.required),
  //   'email': new FormControl('', Validators.required),
  //   'position': new FormControl('', Validators.required),
  //   'lettre_motivation': new FormControl('', Validators.required),
  //   'cv': new FormControl('', Validators.required)
  // })

  addCandidat(): void {
    this.candidatForm.get("idO")?.setValue(this.getbyid)
    // console.log( this.candidatForm.value.idO)
    // console.log( this.candidatForm.value.cv)
    if (this.candidatForm.valid) {
      this.candidatService.AddCandidature(this.candidatForm.value).subscribe(
        (res) => {
          alert("Candidature Added Successfuly");
          let ref = document.getElementById("cancel");
          ref?.click();

          this.candidatForm.reset();

        })
    } else {
      alert("Somthing Went Wrong");
    }
  }

  uploadFile(event: any){
    console.log(event);
    
    this.file = event.target.files[0]
    const body = new FormData();
    body.append('image', this.file, this.file?.name);
    console.log(this.file?.name,'yyyy');
    this.candidatService.UploadCv(body).subscribe((res) =>{
      this.candidatForm.get("cv")?.setValue(res[0])
      console.log(res)
    })
  }
  checkUser(){
    const user = localStorage.getItem("role")
    if(user){
      this.openmodale = true;
    }else{
      this.openmodale = false;
      this.router.navigate(["login"])
    }
  }

  getallOffre() {
    this.offreserv.GetOffres()
      .subscribe((res) => {
        this.Data = res.data;
      });
  }
}

