import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {BehaviorSubject} from "rxjs";
import {ICompany} from "../../interfaces/ICompany";

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
    companies$: BehaviorSubject<ICompany[]>;

    constructor(private companyService: CompanyService) {
    }

    ngOnInit(): void {
        this.companies$ = this.companyService.companies$;
        this.companyService.getCompanies();
    }
}
