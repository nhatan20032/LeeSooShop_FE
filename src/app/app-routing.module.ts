import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { HomePageComponent } from './views/admin/home-page/home-page.component';
import { ProductComponent } from './views/admin/product/product.component';
import { GenderComponent } from './views/admin/gender/gender.component';
import { CatalogComponent } from './views/admin/catalog/catalog.component';
import { BrandComponent } from './views/admin/brand/brand.component';
import { AgeComponent } from './views/admin/age/age.component';
import { DiscountProductComponent } from './views/admin/discounts/discount-product/discount-product.component';
import { DiscountCatalogComponent } from './views/admin/discounts/discount-catalog/discount-catalog.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "home-page", component: HomePageComponent },
      { path: "product", component: ProductComponent },
      { path: "gender", component: GenderComponent },
      { path: "discount-product", component: DiscountProductComponent },
      { path: "discount-catalog", component: DiscountCatalogComponent },
      { path: "catalog", component: CatalogComponent },
      { path: "brand", component: BrandComponent },
      { path: "age", component: AgeComponent },
      { path: "", redirectTo: "home-page", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
