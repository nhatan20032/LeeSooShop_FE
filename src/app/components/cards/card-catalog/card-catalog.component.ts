import { Component, OnInit } from "@angular/core";


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    constructor() { }

    ngOnInit(): void { }
}
