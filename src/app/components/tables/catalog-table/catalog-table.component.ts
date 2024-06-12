import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CatalogElement, CatalogServices } from './catalog-data.services';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModifiedDialogComponent } from '../../dialogs/catalog-dialogs/modified-dialog/modified-dialog.component';

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

    constructor(private dataService: CatalogServices, private dialog: MatDialog) { }

    openDialog(element: CatalogElement): void {
        const dialogRef = this.dialog.open(ModifiedDialogComponent, {
            data: element
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    ngOnInit(): void {
        this.loadElements(0, -1, this.search);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    loadElements(offset: number, limit: number, search: string) {
        this.dataService.getElements(offset, limit, search).subscribe(
            (response: any) => {
                this.dataSource.data = response.data;
                this.totalElements = response.total;
                console.log(response);
            }
        );
    }
    onSearch(event: any) {
        const value = event.target.value;
        this.search = value;
        this.loadElements(0, this.paginator.pageSize, this.search);
    }

}