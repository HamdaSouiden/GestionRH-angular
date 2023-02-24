import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ListDeparetmentComponent } from './components/deparetment/list-deparetment/list-deparetment.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { RoleGuard } from './services/role.guard';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { UsersComponent } from './components/users/users.component';
import { ListOffreComponent } from './components/offres/list-offre/list-offre.component';
import { AddOffreComponent } from './components/offres/add-offre/add-offre.component';
import { OffreEmploiComponent } from './components/offres/offre-emploi/offre-emploi.component';
import { OffreItemComponent } from './components/offres/offre-item/offre-item.component';
import { ListCandidatureComponent } from './components/candidature/list-candidature/list-candidature.component';
import { ContactComponent } from './components/contact/contact.component';
import { EntretienComponent } from './components/entretien/entretien.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AboutComponent,
    HomeComponent,
    ListDeparetmentComponent,
    UsersComponent,
    ListOffreComponent,
    AddOffreComponent,
    OffreEmploiComponent,
    OffreItemComponent,
    ListCandidatureComponent,
    ContactComponent,
    EntretienComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
