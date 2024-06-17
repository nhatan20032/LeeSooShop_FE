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
import { CatalogElement, CatalogServices, CatalogData } from "../../../../views/admin/catalog/catalog-data.services";
import { MatSelectModule } from '@angular/material/select';
@Component({
    selector: "app-modified-dialog",
    templateUrl: "./created-dialog.component.html",
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
export class CreatedDialogComponent implements OnInit {
    catalogs: CatalogElement[] = [];
    selectedCatalog: number | null = null;
    constructor(
        public dialogRef: MatDialogRef<CreatedDialogComponent>,
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
    onCreated(): void {
        const created: CatalogData = {
            id: this.data.id,
            parent_id: this.selectedCatalog,
            title: this.data.catalog_title,
            description: this.data.description
        };
        console.log(created);
    }
}