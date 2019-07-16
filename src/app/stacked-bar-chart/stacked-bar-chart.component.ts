import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import {ServicesService} from '../services.service';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  data: any;
  setting: any;
  key: any;
  index: any;
  settingKeys: any;
  statKeys: any;
  chartId: any;
  idKey: any;
  nameKey: any;
  @Input() Sdata: any = [[], []];
  @Input() yValue: string;
  @Input() Skey: Array<string> = [];
  @Input() StatSetting: Array<string> = [];
  Chart: am4charts.XYChart;
  SchartData: any = [];
  StateName: Array<string> = [];
  StateColor: Array<string> = [];
  showError: boolean;

  constructor(private Service: ServicesService) {
  }

  ngOnInit() {
    ServicesService.getChartId(1111111, 9999999).subscribe(id => {
      this.chartId = id;
    });
    this.statKeys = Object.keys(this.data[0]);
    this.idKey = this.statKeys[0];
    this.nameKey = this.statKeys[1];
    this.statKeys = this.statKeys.slice(2);

    if (this.key.length > 3) {
      this.key = Object.keys(this.data[0]);
      this.settingKeys = Object.keys(this.setting[0]);
      this.configData();
    }
  }

  ngOnDestroy() {
    this.Chart.disposeChildren();
    this.Chart.dispose();
    if (this.Chart) {
      this.Chart.disposeChildren();
      this.Chart.dispose();
    }
    delete this.Chart;
  }

  ngAfterViewInit() {
    this.Chart = am4core.create(this.chartId, am4charts.XYChart);
    if (this.key.length > 3) {
      this.showError = false;
      let chart: am4charts.XYChart;
      chart = this.Chart;
      chart.percentWidth = 90;
      chart.scrollbarX = new am4core.Scrollbar();
      chart.align = 'center';
      chart.responsive.enabled = false;
      chart.fontFamily = 'Calibri, serif';
      chart.fontWeight = 'lighter';
      chart.maskBullets = false;

      let i = 0;
      chart.data = [...this.data];
      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = this.nameKey;
      categoryAxis.fontSize = '20px';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.horizontalCenter = 'right';
      categoryAxis.renderer.labels.template.verticalCenter = 'middle';
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = false;
      categoryAxis.renderer.minHeight = 110;
      categoryAxis.renderer.maxHeight = 500;
      categoryAxis.renderer.inside = true;
      categoryAxis.resizable = true;
      // const Title = topContainer.createChild(am4core.Label);
      // Title.text = 'Heroes';
      // Title.fontSize = '40px';
      // Title.fontWeight = '600';
      // Title.align = 'center';
      // Title.paddingBottom = 60;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.line.strokeOpacity = 0.5;
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.minGridDistance = 60;
      valueAxis.fontSize = '20px';
      valueAxis.calculateTotals = true;
      // valueAxis.title.text = 'Stat';
      // valueAxis.title.fontWeight = 'bold';
      // valueAxis.title.fontSize = '2vw';
      // valueAxis.renderer.baseGrid.disabled = false;

      chart.responsive.enabled = true;
      chart.paddingBottom = 10;

      // const topContainer = chart.chartContainer.createChild(am4core.Container);
      // topContainer.layout = 'absolute';
      // topContainer.toFront();
      // topContainer.paddingBottom = 15;
      // topContainer.width = am4core.percent(80);

      // const span = topContainer.createChild(am4charts.AxisLabel.);
      // span.renderer.line.strokeOpacity = 0.5;
      // span.renderer.minGridDistance = 60;
      // span.fontSize = '20px';
      // span.calculateTotals = true;
      // span.title.text = 'Stat';
      // span.title.fontWeight = 'bold';
      // span.title.fontSize = '2vw';
      // span.title.validatePosition();


      let series;
      let tTip = '';

      for (let h = 3; h > 0; h--) {
        series = chart.series.push(new am4charts.ColumnSeries());
        series.name = this.statKeys[0];
        series.dataFields.valueY = this.statKeys[this.statKeys.length - h];
        series.dataFields.categoryX = 'name';
        series.legendSettings.labelText = this.statKeys[this.statKeys.length - h];
        series.legendSettings.itemLabelText = this.statKeys[this.statKeys.length - h];
        tTip = tTip + this.statKeys[this.statKeys.length - h] + ' : [bold] {' + this.statKeys[this.statKeys.length - h] + '} [/]\n ';
        series.fill = am4core.color(this.StateColor[i]);
        series.fillOpacity = 0.8;
        series.stacked = true;

        if (h === 1) {
          tTip = tTip + 'Total Value : [bold]{valueY.total}[\]';
          series.tooltip.pointerOrientation = 'horizontal';
          series.tooltip.getFillFromObject = false;
          series.tooltip.background.fill = am4core.color('#343434');
          series.columns.template.column.cornerRadiusTopLeft = 1;
          series.columns.template.column.cornerRadiusTopRight = 1;
          series.tooltipText = tTip;
        }
        i++;
      }

      // Cursor
      chart.cursor = new am4charts.XYCursor();
      // Legend
      chart.legend = new am4charts.Legend();
      chart.legend.itemContainers.template.clickable = true;
      chart.legend.position = 'bottom';
      chart.legend.useDefaultMarker = true;
      let marker = chart.legend.markers.template.children.getIndex(0);
      // @ts-ignore
      marker.cornerRadius(12, 12, 12, 12);
      marker.strokeWidth = 2;
      marker.strokeOpacity = 1;
      marker.stroke = am4core.color('#ccc');
      this.Service.sendMessageError(false);

    } else {
      this.Service.sendMessageError(true);

    }
  }

  configData() {
    let i = 0;
    for (let setting of this.setting) {
      this.StateName[i] = setting[this.settingKeys[1]];
      this.StateColor[i] = setting[this.settingKeys[2]];
      i++;
    }
  }
}
