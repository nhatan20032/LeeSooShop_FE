import { Component, OnInit } from "@angular/core";
import { CatalogTableComponent } from "../../../components/tables/catalog-table/catalog-table.component";

@Component({
    selector: "app-catalog",
    templateUrl: "./catalog.component.html",
    standalone: true,
    imports: [CatalogTableComponent]
})
export class CatalogComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
