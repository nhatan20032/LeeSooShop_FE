import { Component, OnInit } from "@angular/core";
import { CatalogTableComponent } from "../../../components/tables/catalog-table/catalog-table.component";
import { CardCatalogComponent } from "../../../components/cards/card-catalog/card-catalog.component";
import { CatalogElement, CatalogServices } from "./catalog-data.services";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: "app-catalog",
    templateUrl: "./catalog.component.html",
    standalone: true,
    imports: [CatalogTableComponent, CardCatalogComponent]
})
export class CatalogComponent implements OnInit {
    dataSource = new MatTableDataSource<CatalogElement>([]);
    totalElements: number = 0;
    search: string = '';

    constructor(private dataService: CatalogServices) { }

    ngOnInit() { }

    loadElements(offset: number, limit: number, search: string) {
        this.dataService.getElements(offset, limit, search).subscribe(
            (response: any) => {
                this.dataSource.data = response.data;
                this.totalElements = response.total;
            }
        );
    }
}
