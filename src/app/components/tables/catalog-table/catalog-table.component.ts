import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CatalogElement, CatalogServices } from './catalog-data.services';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-catalog-table',
    styleUrl: 'catalog-table.component.css',
    templateUrl: 'catalog-table.component.html',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class CatalogTableComponent implements AfterViewInit, OnInit {
    displayedColumns: string[] = ['id', 'parent_id', 'parent_title', 'catalog_title', 'description', 'action'];
    dataSource = new MatTableDataSource<CatalogElement>([]);
    totalElements: number = 0;
    search: string = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private dataService: CatalogServices) { }

    ngOnInit(): void {
        this.loadElements(0, -1, this.search);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        merge(this.paginator.page, this.sort.sortChange)
            .pipe(
                tap(() => this.loadElements(this.paginator.pageIndex, this.paginator.pageSize, this.search))
            )
            .subscribe();
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