import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent implements OnInit {
  constructor(private route: ActivatedRoute, private offreService: OffreService) { }

  errormsg: any;
  successmsg: any;
  getbyid: any;

  ngOnInit() {
    this.getbyid = this.route.snapshot.paramMap.get('id');
    if(this.getbyid){
      this.offreService.GetOffreById(this.getbyid).subscribe((res)=> {
        this.offreForm.patchValue({ 
          title: res.data.title,
          postes_vacants: res.data.postes_vacants,
          type_demploi_desire: res.data.type_demploi_desire,
          experience: res.data.experience,
          niveau_detude: res.data.niveau_detude,
          langue: res.data.langue,
          description_emploi: res.data.description_emploi,
          exigences_emploi: res.data.exigences_emploi,
          date_expiration: res.data.date_expiration,
        });
      })
    }
  }

  offreForm = new FormGroup({
    'title': new FormControl('', Validators.required),
    'postes_vacants': new FormControl('', Validators.required),
    'type_demploi_desire': new FormControl('', Validators.required),
    'experience': new FormControl('', Validators.required),
    'niveau_detude': new FormControl('', Validators.required),
    'langue': new FormControl('', Validators.required),
    'description_emploi': new FormControl('', Validators.required),
    'exigences_emploi': new FormControl('', Validators.required),
    'date_expiration': new FormControl('', Validators.required),
  })

  addOffre(): void {
    if(this.offreForm.valid){
      this.offreService.AddOffre(this.offreForm.value).subscribe(
        (res) => {
          this.offreForm.reset();
          this.successmsg = res.message;
        })
    }else{
      this.errormsg = "field is required !";
    }
  };

  updateOffre(): void {
    if(this.offreForm.valid){
      this.offreService.UpdateOffre(this.offreForm.value, this.getbyid).subscribe((res)=> {
        this.successmsg = res.message;
      });
    }else{
      this.errormsg = "field is required !";
    }
  }

}
