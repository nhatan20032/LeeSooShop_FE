import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDropdownComponent } from './components/dropdowns/user-dropdown/user-dropdown.component';
import { FooterAdminComponent } from './components/footers/footer-admin/footer-admin.component';
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    UserDropdownComponent,
    FooterAdminComponent,
    AdminNavbarComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
