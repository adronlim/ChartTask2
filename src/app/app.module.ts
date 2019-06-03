import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
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
import {ChartModule} from './chart/chart.module';
import {StackedBarChartComponent} from './stacked-bar-chart/stacked-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelLayoutComponent,
    NavBarComponent,
    BarChartComponent,
    PieChartComponent,
    HistogramChartComponent,
    DashboardComponent,
    SideBarComponent,
    StackedBarChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [],
  entryComponents: [
    BarChartComponent,
    PieChartComponent,
    HistogramChartComponent
  ]
  ,
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  static forRoot() {
    return {
      ngModule: AppModule,
      providers: [ServicesService, ChartDirective]
    };
  }
}
