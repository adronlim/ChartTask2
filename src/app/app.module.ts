import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ChartComponent} from './chart/chart.component';
import {PanelLayoutComponent} from './panel-layout/panel-layout.component';
import {ChartDirective} from './chart-directive.directive';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {HistogramChartComponent} from './histogram-chart/histogram-chart.component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ServicesService} from './services.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    PanelLayoutComponent,
    ChartDirective,
    HistogramChartComponent,
    NavBarComponent,
    BarChartComponent,
    PieChartComponent,
    DashboardComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ServicesService],
  entryComponents: [BarChartComponent, PieChartComponent, HistogramChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
