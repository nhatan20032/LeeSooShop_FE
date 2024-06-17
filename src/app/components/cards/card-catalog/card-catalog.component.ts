import { Component, Input, OnInit, ViewChild } from "@angular/core";


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { CatalogElement, CatalogServices } from "../../../views/admin/catalog/catalog-data.services";
import { CatalogTableComponent } from "../../tables/catalog-table/catalog-table.component";
import { CreatedDialogComponent } from "../../dialogs/catalog-dialogs/create-dialog/created-dialog.component";
import { CatalogComponent } from "../../../views/admin/catalog/catalog.component";
import { MatTableDataSource } from "@angular/material/table";

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
    @Input() dataSource!: MatTableDataSource<CatalogElement>;
    @Input() totalElements: number = 0;
    @Input() search: string = '';
    @Input() loadElements!: (offset: number, limit: number, search: string) => void;
    @ViewChild(CatalogComponent) catalog!: CatalogComponent;

    constructor(private dataService: CatalogServices, private dialog: MatDialog) { }

    ngOnInit(): void { }

    openCreatedDialog(): void {
        const dialogRef = this.dialog.open(CreatedDialogComponent);

        dialogRef.afterClosed().subscribe((result: CatalogElement) => {
            if (result) {
                this.loadElements(0, -1, this.search);
            }
        });
    }

}
