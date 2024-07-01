import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from 'jquery';
import 'datatables.net';

@Component({
    selector: 'app-catalog-table-v1',
    templateUrl: './catalog-table-v1.1.component.html',
    styleUrls: ['./catalog-table-v1.1.component.html'],
    standalone: true,
})
export class CatalogTableV1Component implements OnInit, AfterViewInit {
    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        $('#example').DataTable();
    }
}
