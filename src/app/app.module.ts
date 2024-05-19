import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {ToastrModule} from "ngx-toastr";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FileViewComponent} from "./components/file-view/file-view.component";
import {FileOverviewComponent} from "./components/file-overview/file-overview.component";
import {FileEditComponent} from "./components/file-edit/file-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {AppRoutingModule} from "./app-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {LoginViewComponent} from './components/login-view/login-view.component';
import {AlertComponent} from './components/alert/alert.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {FilepickerDirective} from './directives/filepicker.directive';
import {SelectedFilesTableComponent} from './components/selected-files-table/selected-files-table.component';
import {JwtInterceptor} from "./services/auth/jwt.interceptor";
import {ErrorInterceptor} from "./services/auth/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    FileEditComponent,
    FileOverviewComponent,
    FileViewComponent,
    LoginViewComponent,
    AlertComponent,
    FilepickerDirective,
    SelectedFilesTableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    FormsModule,
    MatCardModule,
    AppRoutingModule,
    MatButtonModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
