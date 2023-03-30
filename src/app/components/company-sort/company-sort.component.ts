import {Component, OnInit} from '@angular/core';
import {CompanyService, sortValue} from "../../services/company.service";

@Component({
  selector: 'app-company-sort',
  templateUrl: './company-sort.component.html',
  styleUrls: ['./company-sort.component.scss']
})
export class CompanySortComponent implements OnInit {
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  sort(sortType: sortValue) {
    this.companyService.sortCompanies(sortType);
  }
}
