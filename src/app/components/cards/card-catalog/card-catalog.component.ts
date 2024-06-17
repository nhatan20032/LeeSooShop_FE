import { Component, OnInit, ViewChild } from "@angular/core";


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { CatalogElement, CatalogServices } from "../../../views/admin/catalog/catalog-data.services";
import { CatalogTableComponent } from "../../tables/catalog-table/catalog-table.component";
import { CreatedDialogComponent } from "../../dialogs/catalog-dialogs/create-dialog/created-dialog.component";
import { CatalogComponent } from "../../../views/admin/catalog/catalog.component";

@Component({
    selector: "app-card-catalog",
    templateUrl: "./card-catalog.component.html",
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule
    ],
})
export class CardCatalogComponent implements OnInit {

    @ViewChild(CatalogComponent) catalog!: CatalogComponent;

    constructor(private dataService: CatalogServices, private dialog: MatDialog) { }

    ngOnInit(): void { }

    openCreatedDialog(element: CatalogElement): void {
        const dialogRef = this.dialog.open(CreatedDialogComponent, {
            data: element
        });

        dialogRef.afterClosed().subscribe((result: CatalogElement) => {
            if (result) {
                this.catalog.loadElements(0, -1, "");
            }
        });
    }

}
