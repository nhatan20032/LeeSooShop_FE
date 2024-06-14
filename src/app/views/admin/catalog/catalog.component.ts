import { Component, OnInit } from "@angular/core";
import { CatalogTableComponent } from "../../../components/tables/catalog-table/catalog-table.component";
import { CardCatalogComponent } from "../../../components/cards/card-catalog/card-catalog.component";

@Component({
    selector: "app-catalog",
    templateUrl: "./catalog.component.html",
    standalone: true,
    imports: [CatalogTableComponent, CardCatalogComponent]
})
export class CatalogComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
