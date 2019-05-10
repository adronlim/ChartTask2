import {AfterViewInit, Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChartDirective} from '../chart-directive.directive';
import {ChartDataComponent} from '../ChartData';
import {ServicesService} from '../services.service';
import {ChComponentInt} from '../ChComponentInt';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(ChartDirective) appChartDirective: ChartDirective;
  @Input() idComponentChart: any;
  @Input() onClick: boolean;
  Trigger = false;
  dItem: ChartDataComponent[];
  HeroesDataS: any;
  ChartSetting: any;
  key: any;
  interval: any;
  ChartDataComponent: ChartDataComponent;
  multiYvalue: boolean;
  componentFactory: any;
  viewContainerRef: any;
  componentRef: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private Service: ServicesService) {
  }

  ngOnInit() {
    console.log(this.idComponentChart);
  }

  ngAfterViewInit() {
    console.log(this.idComponentChart);
    this.Service.getHeroes().subscribe(chartData => {
      this.HeroesDataS = chartData.HEROES;
      console.log(chartData.statSetting);
      this.ChartSetting = chartData.statSetting;
      this.key = Object.keys(this.HeroesDataS[0]);
      this.key.splice(0, 2);
      console.log(this.key);
      this.loadChartComponent();
    });
  }

  ngOnDestroy() {
    this.displayTemplate();
  }

  loadChartComponent() {
    let chartComponents = this.Service.getChartComponent();
    console.log(chartComponents);
    console.log(this.idComponentChart);
    if (this.idComponentChart) {
      this.Trigger = true;
    }
    let chartDataParameter = [];

    let currentIndex: number;

    switch (this.idComponentChart) {
      case 'BarChartComponent':
        currentIndex = 0;
        this.multiYvalue = false;
        break;
      case 'PieChartComponent':
        currentIndex = 1;
        this.multiYvalue = false;
        break;
      case 'HistogramChartComponent':
        currentIndex = 2;
        this.multiYvalue = true;
        break;
      default:
        return;
    }


    if (!this.multiYvalue) {
      this.HeroesDataS.forEach(e => {
        chartDataParameter.push({name: e.name, str: e.str});
      });
      this.ChartDataComponent = new ChartDataComponent(chartComponents[currentIndex], chartDataParameter, this.ChartSetting, this.key);
    } else {
      this.ChartDataComponent = new ChartDataComponent(chartComponents[currentIndex], this.HeroesDataS, this.ChartSetting, this.key);
    }


    console.log(this.ChartDataComponent.component);

    this.displayTemplate();
  }

  displayTemplate() {
    this.appChartDirective.CBfunction(() => {
      let DItem = this.ChartDataComponent.component;
      console.log(DItem);
      this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(DItem);
      this.viewContainerRef = this.appChartDirective.viewContainerRef;
      this.viewContainerRef.clear();

      this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
      (this.componentRef.instance as ChComponentInt).data = this.ChartDataComponent.data;
      console.log((this.componentRef.instance as ChComponentInt).data);
      (this.componentRef.instance as ChComponentInt).setting = this.ChartDataComponent.setting[0];
      console.log((this.componentRef.instance as ChComponentInt).setting);
    });

    // (componentRef.instance as ChComponentInt).key = this.ChartDataComponent.key[0];
    // console.log((componentRef.instance as ChComponentInt).key);
  }

}
