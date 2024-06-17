import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserDropdownComponent } from './components/dropdowns/user-dropdown/user-dropdown.component';
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { HeaderStatsComponent } from './components/headers/header-stats/header-stats.component';
import { CardStatsComponent } from './components/cards/card-stats/card-stats.component';
import { CardPageVisitsComponent } from './components/cards/card-page-visits/card-page-visits.component';
import { CardSocialTrafficComponent } from './components/cards/card-social-traffic/card-social-traffic.component';
import { HomePageComponent } from './views/admin/home-page/home-page.component';
import { ProductComponent } from './views/admin/product/product.component';
import { GenderComponent } from './views/admin/gender/gender.component';
import { BrandComponent } from './views/admin/brand/brand.component';
import { AgeComponent } from './views/admin/age/age.component';
import { DiscountProductComponent } from './views/admin/discounts/discount-product/discount-product.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CatalogServices } from './views/admin/catalog/catalog-data.services';

@NgModule({
  declarations: [
    UserDropdownComponent,
    AdminNavbarComponent,
    SidebarComponent,
    AdminComponent,
    HeaderStatsComponent,
    CardStatsComponent,
    CardPageVisitsComponent,
    CardSocialTrafficComponent,
    HomePageComponent,
    ProductComponent,
    GenderComponent,
    DiscountProductComponent,
    BrandComponent,
    AgeComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    CatalogServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
