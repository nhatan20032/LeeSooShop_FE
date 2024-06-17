import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { CatalogElement } from "../../../views/admin/catalog/catalog-data.services";
import { CreatedDialogComponent } from "../../dialogs/catalog-dialogs/create-dialog/created-dialog.component";
import { CatalogComponent } from "../../../views/admin/catalog/catalog.component";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

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
    searchControl = new FormControl('');
    @Input() dataSource!: MatTableDataSource<CatalogElement>;
    @Input() totalElements: number = 0;
    @Input() search: string = '';
    @Input() loadElements!: (offset: number, limit: number, search: string) => void;

    @Output() searchChange = new EventEmitter<string>();
    @ViewChild(CatalogComponent) catalog!: CatalogComponent;

    constructor(private dialog: MatDialog,) {
        this.searchControl.valueChanges.pipe(
            debounceTime(1000) // Chờ 1 giây sau khi người dùng ngừng nhập
        ).subscribe(value => {
            this.searchChange.emit(value!);
        });
    }

    ngOnInit(): void { }

    openCreatedDialog(): void {
        const dialogRef = this.dialog.open(CreatedDialogComponent);

        dialogRef.afterClosed().subscribe((result: CatalogElement) => {
            if (result) {
                this.loadElements(0, -1, this.search);
            }
        });
    }

    onSearchInputChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.searchChange.emit(inputElement.value);
    }

}
