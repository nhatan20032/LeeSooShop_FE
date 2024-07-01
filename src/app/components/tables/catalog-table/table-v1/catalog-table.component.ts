import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CatalogElement } from '../../../../views/admin/catalog/catalog-data.services';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModifiedDialogComponent } from '../../../dialogs/catalog-dialogs/modified-dialog/modified-dialog.component';
import { DeleteDialogComponent } from '../../../dialogs/catalog-dialogs/delete-dialog/delete-dialog.component';

/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-catalog-table',
    styleUrl: 'catalog-table.component.css',
    templateUrl: 'catalog-table.component.html',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class CatalogTableComponent implements AfterViewInit, OnInit {
    @Input() dataSource: MatTableDataSource<CatalogElement> = new MatTableDataSource<CatalogElement>();
    @Input() totalElements: number = 0;
    @Input() search: string = '';
    @Input() loadElements!: (offset: number, limit: number, search: string) => void;

    displayedColumns: string[] = ['id', 'parent_title', 'catalog_title', 'description', 'action'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private dialog: MatDialog) { }

    openModifiedDialog(element: CatalogElement): void {
        const dialogRef = this.dialog.open(ModifiedDialogComponent, {
            data: element
        });

        dialogRef.afterClosed().subscribe((result: CatalogElement) => {
            if (result) {
                this.loadElements(0, -1, this.search);
            }
        });
    }

    openDeleteDialog(element: CatalogElement): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            data: element
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.loadElements(0, -1, this.search);
            }
        });
    }

    ngOnInit(): void {
        this.loadElements(0, -1, this.search);
    }

    ngAfterViewInit() {
        if (this.dataSource) {
            this.dataSource.paginator = this.paginator;
        }
    }

    onSearchChange(newSearch: string): void {
        this.search = newSearch;
        this.loadElements(0, -1, this.search);
    }
}
