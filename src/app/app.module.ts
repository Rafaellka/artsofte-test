import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CompanyListComponent} from './components/company-list/company-list.component';
import {CompanyDetailComponent} from './components/company-detail/company-detail.component';
import {CompanyFilterComponent} from './components/company-filter/company-filter.component';
import {CompanySortComponent} from './components/company-sort/company-sort.component';
import {CompanyItemComponent} from './components/company-item/company-item.component';
import {LayoutComponent} from './components/layout/layout.component';
import {CompanyYandexMapComponent} from './components/company-yandex-map/company-yandex-map.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        CompanyListComponent,
        CompanyDetailComponent,
        CompanyFilterComponent,
        CompanySortComponent,
        CompanyItemComponent,
        LayoutComponent,
        CompanyYandexMapComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
