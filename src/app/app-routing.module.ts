import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ListCandidatureComponent } from './components/candidature/list-candidature/list-candidature.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListDeparetmentComponent } from './components/deparetment/list-deparetment/list-deparetment.component';
import { EntretienComponent } from './components/entretien/entretien.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddOffreComponent } from './components/offres/add-offre/add-offre.component';
import { ListOffreComponent } from './components/offres/list-offre/list-offre.component';
import { OffreEmploiComponent } from './components/offres/offre-emploi/offre-emploi.component';
import { OffreItemComponent } from './components/offres/offre-item/offre-item.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'departement', component: ListDeparetmentComponent },
  { path: 'user', component: UsersComponent },
  { path: 'offre', component: ListOffreComponent },
  // { path: 'offre/add', component: AddOffreComponent },
  // { path: 'offre/:id', component: AddOffreComponent },
  { path: 'offredemploi', component: OffreEmploiComponent },
  { path: 'offre-item/:id', component: OffreItemComponent },
  { path: 'offre-item/:id/postuler', component: OffreItemComponent },
  { path: 'candidature', component: ListCandidatureComponent },
  { path: 'entretien', component: EntretienComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
