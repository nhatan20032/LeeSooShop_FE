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
import { CatalogElement, CatalogServices } from "../../../../views/admin/catalog/catalog-data.services";
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
    selector: "app-delete-dialog",
    templateUrl: "./delete-dialog.component.html",
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
export class DeleteDialogComponent implements OnInit {
    catalogs: CatalogElement[] = [];
    selectedCatalog: number | null = null;
    default_title: string = this.data.catalog_title
    constructor(
        public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CatalogElement,
        private dataService: CatalogServices,
        private snackBar: MatSnackBar
    ) { }
    ngOnInit(): void {
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    deleteCatalog(): void {
        this.dataService.deleteCatalog(this.data.id).subscribe(
            () => {
                this.snackBar.open('Xóa danh mục thành công!', 'Đóng', { duration: 3000 });
                this.dialogRef.close(true);
            },
            error => {
                console.error('Error deleting catalog', error);
                this.snackBar.open('Xóa danh mục thất bại', 'Đóng', { duration: 3000 });
            }
        );
    }
}