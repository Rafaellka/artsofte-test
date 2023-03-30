import {Component, OnInit} from '@angular/core';
import {CompanyService, ICompany} from "../../services/company.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
    companyInfo: ICompany;

    constructor(private route: ActivatedRoute, private companyService: CompanyService) {
    }

    ngOnInit(): void {
        this.companyInfo = this.companyService.getCompanyById(this.route.snapshot.params['id']);
    }
}
