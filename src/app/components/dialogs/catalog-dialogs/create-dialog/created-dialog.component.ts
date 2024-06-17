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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
        MatSelectModule,
        MatSnackBarModule
    ],
})
export class CreatedDialogComponent implements OnInit {
    catalogs: CatalogElement[] = [];
    selectedCatalog: number | null = null;
    title: string = '';
    description: string = '';
    constructor(
        public dialogRef: MatDialogRef<CreatedDialogComponent>,
        private dataService: CatalogServices,
        private snackBar: MatSnackBar
    ) { }
    ngOnInit(): void {
        this.loadCatalogs();
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
        const newCatalog: CatalogData = {
            id: 0,
            parent_id: this.selectedCatalog ?? 0,
            title: this.title,
            description: this.description
        };
        this.dataService.createdCatalog(newCatalog).subscribe(
            response => {
                this.snackBar.open('Tạo danh mục thành công!', 'Đóng', { duration: 3000 });
                this.dialogRef.close(response);
            },
            error => {
                console.error('Error creating catalog', error);
                this.snackBar.open('Tạo danh mục thất bại', 'Đóng', { duration: 3000 });
            }
        );
    }
}