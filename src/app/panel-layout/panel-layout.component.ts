import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.css']
})
export class PanelLayoutComponent implements OnInit, AfterViewInit {
  @Input() data: any = [[], []];
  @Input() yValue: any;
  @Input() Hkey: string;
  rawData: any = [];
  hisData: Array<any> = [];
  Chart: am4charts.XYChart;
  statID: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let yFullName: string;
    let chartColor: string;
    this.statID = this.yValue.statName + 'H';
    console.log(this.statID);
    console.log('StrengthH  :   ' + typeof this.yValue.statName);

    if (this.yValue.statName === 'Strength') {
      this.Chart = am4core.create(this.yValue.statName + 'H', am4charts.XYChart);
    } else if (this.yValue.statName === 'Agility') {
      this.Chart = am4core.create(this.yValue.statName + 'H', am4charts.XYChart);
    } else if (this.yValue.statName === 'Intelligence') {
      this.Chart = am4core.create(this.yValue.statName + 'H', am4charts.XYChart);
    } else {
      console.log('NOTHING');
      return;
    }
    this.Chart.percentWidth = 90;
    let hChart = this.Chart;


    hChart.scrollbarX = new am4core.Scrollbar();
    hChart.fontFamily = 'Calibri, serif';
    hChart.fontWeight = 'lighter';
    let i = 0;
    for (const HeroD of this.data) {
      for (const hd of HeroD) {
        this.rawData[i] = hd;
        i++;
      }
    }
    console.log(this.rawData[1][this.Hkey]);

    if (this.yValue.statName == 'Strength') {
      this.rawData.sort((a, b) => a.str - b.str);
    } else if (this.yValue.statName == 'Agility') {
      this.rawData.sort((a, b) => a.ag - b.ag);
    } else if (this.yValue.statName == 'Intelligence') {
      this.rawData.sort((a, b) => a.int - b.int);
    }


    i = 0;      // loop index
    let h = 0;  // index that count element number of hisData
    let j = 0;  // XXXX
    // Count the frequency for histogram chart
    console.log(this.hisData);
    for (const rData of this.rawData) {
      if (this.hisData[h] == undefined || this.hisData[h] == null) {
        console.log(rData[this.Hkey]);
        this.hisData.push({degree: rData[this.Hkey], freq: 0});
        console.log(this.hisData[h]);
        this.hisData[h].freq = 1;
      } else if (this.rawData[i + 1] === undefined || this.rawData[i + 1] === null) {
        console.log('RAWDATA UNDEFINED OR NULL');
        break;
      }

      if (rData[this.Hkey] === this.rawData[i + 1][this.Hkey]) {
        this.hisData[h].freq += 1;
        console.log(this.hisData);
      } else {
        h++;
        // this.hisData[h].degree = rData[this.Hkey];
        // this.hisData[h].freq += 1;
      }
      i++;
    }

    switch (this.yValue.statName) {
      case 'Strength': {
        yFullName = this.yValue.statName;
        chartColor = this.yValue.statColor;
        break;
      }
      case 'Agility': {
        yFullName = this.yValue.statName;
        chartColor = this.yValue.statColor;
        break;
      }
      case 'Intelligence': {
        yFullName = this.yValue.statName;
        chartColor = this.yValue.statColor;
        break;
      }
      default: {
        return;
      }
    }

    this.hisData.sort((a, b) => a.degree - b.degree);
    this.hisData.unshift({degree: null, freq: 0});
    this.hisData.push({degree: null, freq: 0});
    hChart.data = this.hisData;

// Create axes
    const categoryAxis = hChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'degree';
    categoryAxis.fontSize = '20px';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';
    categoryAxis.renderer.labels.template.textAlign = 'start';
    // categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    categoryAxis.startLocation = 0;
    categoryAxis.endLocation = 1;

    const valueAxis = hChart.yAxes.push(new am4charts.ValueAxis());

    const topContainer = hChart.chartContainer.createChild(am4core.Container);
    topContainer.layout = 'absolute';
    topContainer.toBack();
    topContainer.paddingBottom = 15;
    topContainer.width = am4core.percent(100);

    const Title = topContainer.createChild(am4core.Label);
    Title.text = yFullName;
    Title.fontSize = '40px';
    Title.fontWeight = '600';
    Title.align = 'center';
    Title.paddingBottom = 60;

    // Create series
    const series = hChart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = 'freq';
    series.dataFields.categoryX = 'degree';
    // series.fontSize = '50px';
    series.name = yFullName;
    series.fill = am4core.color(chartColor);
    // series.yAxis =
    series.columns.template.tooltipText = 'Degree:  [bold]{categoryX}[/] \n   Frequency:  [bold]{valueY}[/]';
    series.columns.template.strokeWidth = 0;
    series.tooltip.pointerOrientation = 'vertical';
    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.fillOpacity = .8;


    const columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 1;
    columnTemplate.strokeOpacity = .5;
    columnTemplate.width = am4core.percent(100);


    // on hover, make corner radiuses bigger
    const hoverState = series.columns.template.column.states.create('hover');
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    // Cursor
    hChart.cursor = new am4charts.XYCursor();
  }
}
