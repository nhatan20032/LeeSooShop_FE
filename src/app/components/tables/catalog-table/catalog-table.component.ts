import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CatalogElement, CatalogServices } from '../../../views/admin/catalog/catalog-data.services';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModifiedDialogComponent } from '../../dialogs/catalog-dialogs/modified-dialog/modified-dialog.component';
import { CatalogComponent } from '../../../views/admin/catalog/catalog.component';

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
    displayedColumns: string[] = ['id', 'parent_title', 'catalog_title', 'description', 'action'];
    dataSource = new MatTableDataSource<CatalogElement>([]);
    totalElements: number = 0;
    search: string = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(CatalogComponent) catalog!: CatalogComponent;

    constructor(private dataService: CatalogServices, private dialog: MatDialog) { }

    openModifiedDialog(element: CatalogElement): void {
        const dialogRef = this.dialog.open(ModifiedDialogComponent, {
            data: element
        });

        dialogRef.afterClosed().subscribe((result: CatalogElement) => {
            if (result) {
                this.catalog.loadElements(0, -1, this.search);
            }
        });
    }

    ngOnInit(): void {
        this.catalog.loadElements(0, -1, this.search);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}