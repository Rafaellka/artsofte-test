import {Component, Input} from '@angular/core';
import {ICompany} from "../../interfaces/ICompany";

@Component({
    selector: 'app-company-item',
    templateUrl: './company-item.component.html',
    styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent {
    @Input() companyInfo: ICompany;
}
