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
    console.log(this.setting);
    console.log(this.data);
    console.log(this.statKeys);
    console.log(this.setting);
    console.log(this.settingKeys);

    if (this.key.length > 3) {
      this.key = Object.keys(this.data[0]);
      console.log(this.chartId);
      this.settingKeys = Object.keys(this.setting[0]);
      this.configData();
    }
  }

  ngOnDestroy() {
    if (this.Chart) {
      this.Chart.dispose();
    }
  }

  ngAfterViewInit() {
    this.Chart = am4core.create(this.chartId, am4charts.XYChart);

    if (this.key.length > 3) {
      this.showError = false;
      let chart: am4charts.XYChart;
      chart = this.Chart;
      chart.percentWidth = 95;
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
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = 'right';
      categoryAxis.renderer.labels.template.verticalCenter = 'middle';
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;

      // console.log(chart.data);
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.line.strokeOpacity = 0.5;
      // valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.minGridDistance = 40;
      valueAxis.fontSize = '20px';
      valueAxis.calculateTotals = true;

      const topContainer = chart.chartContainer.createChild(am4core.Container);
      topContainer.layout = 'absolute';
      topContainer.toFront();
      topContainer.paddingBottom = 15;
      topContainer.width = am4core.percent(100);

      const Title = topContainer.createChild(am4core.Label);
      Title.text = 'Heroes';
      Title.fontSize = '40px';
      Title.fontWeight = '600';
      Title.align = 'center';
      Title.paddingBottom = 60;
      valueAxis.title.text = 'Stat';

      let series;
      let tTip = '';
      for (let h = 3; h > 0; h--) {
        console.log('ToolTip');
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
        if (h === 0) {
          tTip = tTip + 'Total Value : {valueY.total}';
          series.tooltip.pointerOrientation = 'horizontal';
          series.tooltip.getFillFromObject = false;
          series.tooltip.background.fill = am4core.color('#000000');
          series.tooltipText = tTip;
        }
        i++;
      }

      // Cursor
      chart.cursor = new am4charts.XYCursor();
      // Legend
      chart.legend = new am4charts.Legend();
      chart.legend.itemContainers.template.clickable = true;
      chart.legend.position = 'right';
      this.Service.sendMessageError(false);

    } else {
      this.Service.sendMessageError(true);

    }
  }

  configData() {
    let i = 0;
    for (let setting of this.setting) {
      console.log(setting);
      console.log(setting[this.settingKeys[1]]);

      this.StateName[i] = setting[this.settingKeys[1]];
      this.StateColor[i] = setting[this.settingKeys[2]];
      i++;
      console.log(this.StateName);
      console.log(this.StateColor);
    }
  }
}
