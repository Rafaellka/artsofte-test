import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {IFilters} from "../components/company-filter/company-filter.component";

export interface ICompany {
    id: number;
    business_name: string;
    logo: string;
    suffix: string;
    industry: string;
    catch_phrase: string;
    type: string;
    phone_number: string;
    full_address: string;
    longitude: number;
    latitude: number;
}

export type sortValue = 'business_name' | 'type' | 'industry';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private companies: ICompany[] = [];
    public companies$ = new BehaviorSubject<ICompany[]>([]);
    public typeOptions$ = new BehaviorSubject<string[]>([]);
    public industryOptions$ = new BehaviorSubject<string[]>([]);

    constructor(private http: HttpClient) {
    }

    getCompanies(): void {
        if (this.companies.length) {
            this.companies$.next(this.companies);
            return;
        }

        this.http.get<ICompany[]>('https://random-data-api.com/api/company/random_company?size=100')
            .subscribe(values => {
                this.companies = values;
                this.companies$.next(this.companies);
                this.typeOptions$.next(
                    Array.from(
                        new Set(
                            this.companies
                                .map(company => company.type)
                        )
                    )
                );
                this.industryOptions$.next(
                    Array.from(
                        new Set(
                            this.companies
                                .map(company => company.industry)
                        )
                    )
                );
            });
    }

    sortCompanies(sortType: sortValue) {
        this.companies$.next(this.companies.sort((first, second) =>
            first[sortType].localeCompare(second[sortType])))
    }

    getCompanyById(id: string): ICompany {
        const company = this.companies.find((company) => company.id.toString() === id);

        if (!company) {
            throw new Error();
        }
        return company;
    }

    filterCompanies(filters: IFilters) {
        const nameFilterRes = this.companies
            .filter(company =>
                company.business_name.toLowerCase().includes(filters.name.toLowerCase())
            );

        const typeFilterRes = filters.type !== 'All'
            ? nameFilterRes.filter(company => company.type === filters.type)
            : nameFilterRes;

        const industryFilterRes = filters.industry !== 'All'
            ? typeFilterRes.filter(company => company.industry === filters.industry)
            : typeFilterRes;

        this.companies$.next(industryFilterRes);

    }

    filterByName(query: string) {
        this.companies$.next(
            this.companies.filter(
                company => company.business_name.toLowerCase().includes(query.toLowerCase())
            )
        )
    }

    filterByType(type: string) {
        if (type === 'All') {
            this.companies$.next(this.companies);
        } else {
            this.companies$.next(this.companies.filter(company => company.type === type));
        }
    }

    filterByIndustry(industry: string) {
        if (industry === 'All') {
            this.companies$.next(this.companies)
        } else {
            this.companies$.next(this.companies.filter(company => company.industry === industry));
        }
    }
}
