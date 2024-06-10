import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { HomePageComponent } from './views/admin/home-page/home-page.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "home-page", component: HomePageComponent },
      { path: "", redirectTo: "home-page", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
