import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CompanyService} from "../../services/company.service";
import {BehaviorSubject} from "rxjs";
import {IFilters} from "../../interfaces/IFIlters";

@Component({
    selector: 'app-company-filter',
    templateUrl: './company-filter.component.html',
    styleUrls: ['./company-filter.component.scss']
})
export class CompanyFilterComponent implements OnInit {
    filters: FormGroup;
    typeOptions$: BehaviorSubject<string[]>;
    industryOptions$: BehaviorSubject<string[]>;

    constructor(private fb: FormBuilder, private companyService: CompanyService) {
        this.filters = fb.group({
            name: '',
            type: 'All',
            industry: 'All'
        });

        this.filters.valueChanges.subscribe((value: IFilters) => {
            this.companyService.filterCompanies(value);
        });
        /*
        this.filters.get('name')?.valueChanges.subscribe((value) => {
            this.companyService.filterByName(value);
        });
        this.filters.get('type')?.valueChanges.subscribe((type) => {
            this.companyService.filterByType(type);
        });
        this.filters.get('industry')?.valueChanges.subscribe((industry) => {
            this.companyService.filterByIndustry(industry);
        });*/

    }

    ngOnInit(): void {
        this.typeOptions$ = this.companyService.typeOptions$;
        this.industryOptions$ = this.companyService.industryOptions$;
    }
}
