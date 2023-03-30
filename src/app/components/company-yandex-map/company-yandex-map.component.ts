import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {BehaviorSubject} from "rxjs";
import {ICompany} from "../../interfaces/ICompany";

declare const ymaps: any;

@Component({
    selector: 'app-company-yandex-map',
    templateUrl: './company-yandex-map.component.html',
    styleUrls: ['./company-yandex-map.component.scss']
})
export class CompanyYandexMapComponent implements OnInit {
    companies$: BehaviorSubject<ICompany[]>;
    map: any;
    balloon: any;

    constructor(private companyService: CompanyService) {
    }

    ngOnInit(): void {
        this.companies$ = this.companyService.companies$;
        this.companyService.getCompanies();
        ymaps.ready().done(() => this.createMap());
    }

    private createMap(): void {
        this.map = new ymaps.Map('map', {
            center: [41.3, 69.3],
            zoom: 6,
            controls: ['fullscreenControl', 'zoomControl']
        }, {
            suppressMapOpenBlock: true
        });
        this.companies$.subscribe(companies => {
            companies.forEach(company => {
                const placeMark = new ymaps.Placemark([company.latitude, company.longitude], {
                    balloonContent: `
                        <div>Название: ${company.business_name}</div>
                        <div>Тип: ${company.type}</div>
                        <div>Вид деятельности: ${company.industry}</div>
                        <div>Телефон: ${company.phone_number}</div>
                        <div>Адрес: ${company.full_address}</div>`
                }, {
                    openBalloonOnClick: true,
                    iconColor: 'rgba(255,0,98,0.85)'
                });
                this.map.geoObjects.add(placeMark);
            })
        });
        this.balloon = new ymaps.Balloon(this.map);
    }

    companyClick(company: ICompany) {
        this.map.panTo([company.latitude, company.longitude]);
    }
}
