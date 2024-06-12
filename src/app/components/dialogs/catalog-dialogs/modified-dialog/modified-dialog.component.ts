import { Component, Inject, OnInit } from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CatalogElement, CatalogServices } from "../../../tables/catalog-table/catalog-data.services";
import { MatSelectModule } from '@angular/material/select';
@Component({
    selector: "app-modified-dialog",
    templateUrl: "./modified-dialog.component.html",
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatSelectModule
    ],
})
export class ModifiedDialogComponent implements OnInit {
    catalogs: CatalogElement[] = [];
    selectedCatalog: number | null = null;
    constructor(
        public dialogRef: MatDialogRef<ModifiedDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CatalogElement,
        private dataService: CatalogServices
    ) { }
    ngOnInit(): void {
        this.loadCatalogs();
        this.selectedCatalog = this.data.parent_id;
    }
    loadCatalogs(): void {
        this.dataService.getParentElements().subscribe(response => {
            this.catalogs = response.data;
        }, error => {
            console.error('Error loading catalogs', error);
        });
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}