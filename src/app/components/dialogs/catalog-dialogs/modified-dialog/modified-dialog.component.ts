import { Component, Inject } from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CatalogElement } from "../../../tables/catalog-table/catalog-data.services";
import { MatSelectModule } from '@angular/material/select';
interface Food {
    value: string;
    viewValue: string;
}
@Component({
    selector: "app-modified-dialog",
    templateUrl: "./modified-dialog.component.html",
    standalone: true,
    imports: [
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
export class ModifiedDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ModifiedDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CatalogElement
    ) { }
    foods: Food[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];
    onNoClick(): void {
        this.dialogRef.close();
    }
}