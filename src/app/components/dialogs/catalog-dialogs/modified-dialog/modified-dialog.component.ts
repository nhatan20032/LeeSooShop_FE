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
        MatSelectModule,
        MatSnackBarModule
    ],
})
export class ModifiedDialogComponent implements OnInit {
    catalogs: CatalogElement[] = [];
    selectedCatalog: number | null = null;
    default_title: string = this.data.catalog_title
    constructor(
        public dialogRef: MatDialogRef<ModifiedDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CatalogElement,
        private dataService: CatalogServices,
        private snackBar: MatSnackBar
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

    onEdit(): void {
        const updatedCatalog: CatalogData = {
            id: this.data.id,
            parent_id: this.selectedCatalog,
            title: this.data.catalog_title,
            description: this.data.description
        };
        this.dataService.modifiedCatalog(updatedCatalog).subscribe(
            response => {
                this.snackBar.open('Sửa danh mục thành công!', 'Đóng', { duration: 3000 });
                this.dialogRef.close(updatedCatalog);
            },
            error => {
                this.snackBar.open('Sửa danh mục thất bại', 'Đóng', { duration: 3000 });
            }
        );
    }
    onDelete(id: number): void {
        this.dataService.deleteCatalog(id).subscribe(response => {
            console.log('Catalog deleted successfully:', response);
        }, error => {
            console.error('Error deleting catalog:', error);
        });
    }
}