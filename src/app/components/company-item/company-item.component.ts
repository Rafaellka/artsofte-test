import {Component, Input, OnInit} from '@angular/core';
import {ICompany} from "../../services/company.service";

@Component({
    selector: 'app-company-item',
    templateUrl: './company-item.component.html',
    styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent implements OnInit {
    @Input() companyInfo: ICompany;

    constructor() {
    }

    ngOnInit(): void {
    }

}
