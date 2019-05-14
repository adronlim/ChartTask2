import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarChartComponent} from '../bar-chart/bar-chart.component';
import {PieChartComponent} from '../pie-chart/pie-chart.component';
import {HistogramChartComponent} from '../histogram-chart/histogram-chart.component';
import {ChartDirective} from '../chart-directive.directive';
import {ChartComponent} from './chart.component';

@NgModule({
  declarations: [
    ChartDirective,
    ChartComponent
  ],
  providers: [],
  entryComponents: [
    BarChartComponent,
    PieChartComponent,
    HistogramChartComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [ChartComponent]
})
export class ChartModule {
}
