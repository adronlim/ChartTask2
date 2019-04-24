import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { DisplayComponent } from './display/display.component';
import { PanelLayoutComponent } from './panel-layout/panel-layout.component';
import { ChartComponentComponent } from './chart-component/chart-component.component';
import { ChartDirectiveDirective } from './chart-directive.directive';
import { HistogramChartComponent } from './histogram-chart/histogram-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DisplayComponent,
    PanelLayoutComponent,
    ChartComponentComponent,
    ChartDirectiveDirective,
    HistogramChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
