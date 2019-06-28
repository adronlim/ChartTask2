import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChartDirective} from '../chart-directive.directive';
import {ChartDataComponent} from '../ChartData';
import {ServicesService} from '../services.service';
import {BarChartComponent} from '../bar-chart/bar-chart.component';
import {StackedBarChartComponent} from '../stacked-bar-chart/stacked-bar-chart.component';
import {PieChartComponent} from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  _idComponentChart: any;
  TriggerChange = true;
  dItem: ChartDataComponent[];
  HeroesDataS?: any;
  keySlength: number;
  key?: any;
  showError = false;
  statKey?: any;
  getProcessedDataKeys: any;
  chartData?: any;
  Data3d: any;
  Data2d: any;
  DataHis: any;
  DataPie: any;
  ChartDataComponent: ChartDataComponent;
  is3D: boolean;  // The ability of chart to support data structure
  to3dStructure = false; // Change data structure of radio input
  firstChecked: boolean;
  first = true;
  triggerButton = true;
  sortData: boolean;
  multiYvalue: boolean;
  processedData: any;
  currentIndex: number;
  chartComponents: any;
  inputElement: any;
  @ViewChild(ChartDirective) chartDirective: ChartDirective;
  @ViewChild('inputCB') inputCB?: ElementRef;
  @Input() onClick: boolean;
  @Input()
  set idComponentDB(idComponentDB: any) {
    this._idComponentChart = idComponentDB;
  }
  get idComponentDB(): any {
    return this._idComponentChart;
  }

  constructor(/*private componentFactoryResolver: ComponentFactoryResolver, */private Service: ServicesService) {
    this.chartComponents = ChartComponent.getChartComponent();
    console.log(this.chartComponents);
    // console.log(this._idComponentChart);
    // console.log(this.chartData);
  }

  static getChartComponent() {
    return [BarChartComponent, PieChartComponent, BarChartComponent, StackedBarChartComponent];
  }

  ngOnInit() {
    this.statKey = 'str';
    this.Service.get2dHeroes().subscribe(data => {
      // this.to3dStructure = true;
      console.log(this._idComponentChart);
      if (this.Service.findKeyAvailable(data, 'HEROES', 'statSetting')) {
        this.chartData = data;
        console.log(this.chartData);
        this.setParameter(); // To get value of currentIndex & multiYvalue
        this.processDatabyIDindex();

        if (!this.is3D && this.first) {
          this.triggerButton = false;
          console.log('TRIGGER BUTTON IS FALSE!!!!');
        }
        this.loadChartComponent(this.processedData);

        console.log('TRIGGER BUTTON IS ', this.triggerButton);
        console.log(this.keySlength > 3 === this.is3D);
        console.log('keySlength >3 : \n', this.keySlength > 3);
        console.log('is3D  : \n', this.is3D);
        console.log('%cON CHANGE', 'background: #222; color: #bada55');
        console.log(this.HeroesDataS);
        console.log('HEY!');


        this.first = false;
        this.showError = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    let idChanged = ((changes.idComponentDB.currentValue != changes.idComponentDB.previousValue) && changes.idComponentDB.previousValue);
    // let detectTo3dStructure = (changes.to3dStructure.previousValue !== undefined || changes.to3dStructure.previousValue !== null);
    // let radioChanged = (changes.to3dStructure.previousValue != changes.to3dStructure.currentValue) || detectTo3dStructure;
    if (idChanged) {
      this.setParameter();
      this.loadChartComponent(this.processedData);
    }
  }

  ngAfterViewInit() {
  }

  loadChartComponent(data?: any) {

    let chartDataParameter: any;
    let ChartSetting: any;
    console.log(data);
    this.key = Object.keys(data[0][0]);
    chartDataParameter = [...data[0]];
    ChartSetting = data[1];
    if (!this.multiYvalue) { // If the data is 2D type
      console.log(this.processedData);
      console.log(this.key);
      console.log(chartDataParameter);
      console.log(ChartSetting);
    } else {
      console.log(this.HeroesDataS);
      console.log(ChartSetting);
      console.log(this.ChartDataComponent);
    }
    console.log(this.chartComponents);
    this.ChartDataComponent = new ChartDataComponent(this.chartComponents[this.currentIndex], chartDataParameter, ChartSetting, this.key, this.currentIndex);
  }


  setParameter() {
    console.log('%csetParameter!!!!!!!!!!!!!!!!!!', 'background: #222; color: red');
    // this.firstChecked = false;
    switch (this._idComponentChart) {
      case 'BarChartComponent':
        this.currentIndex = 0;
        this.multiYvalue = false;
        this.sortData = true;
        this.is3D = false;
        console.log(this.processedData);
        break;
      case 'PieChartComponent':
        this.currentIndex = 1;
        this.multiYvalue = false;
        this.sortData = false;
        this.is3D = false;
        break;
      case 'HistogramChartComponent':
        this.currentIndex = 2;
        this.multiYvalue = false;
        this.sortData = true;
        this.is3D = false;
        break;
      case 'StackedBarChartComponent':
        this.currentIndex = 3;
        this.multiYvalue = true;
        this.sortData = false;
        this.is3D = true;
        break;
      default:
        return;
    }
  }

  processDatabyIDindex() {
    this.HeroesDataS = this.Service.getDatabyKey(this.chartData, 'HEROES', 'statSetting');
    console.log(this.processedData);

    if (this.currentIndex <= 2) {
      this.processedData = this.Service.get2DChartData(this.HeroesDataS, this.statKey, true);
      console.log('The data is 2D');
    } else {
      this.processedData = this.HeroesDataS;
      console.log('The data is 3D');
    }
    console.log(this.processedData);

    // switch (id) {
    //   case 'BarChartComponent':
    //     this.Data2d = this.returnDataValue(-1, this.HeroesDataS, true);
    //     this.processedData = this.Data2d;
    //     break;
    //   case 'PieChartComponent':
    //     this.DataPie = this.returnDataValue(-1, this.HeroesDataS, false);
    //     this.processedData = this.DataPie;
    //     break;
    //   case 'HistogramChartComponent':
    //     this.DataHis = this.returnDataValue(-1, this.HeroesDataS, true);
    //     console.log(this.DataHis);
    //     this.processedData = this.DataHis;
    //     break;
    //   case 'StackedBarChartComponent':
    //     this.Data3d = this.Service.returnDataValue(1, this.HeroesDataS, false);
    //     this.processedData = this.Data3d;
    //     break;
    //   default:
    //     return;
    // }
    this.getProcessedDataKeys = Object.keys(this.processedData[0][0]);
    this.keySlength = this.getProcessedDataKeys.length;
    console.log(this.getProcessedDataKeys);
    console.log(this.keySlength);
  }

  check() {
    console.log('%cCHECK!!!!!!!!!!!!!!!!!!', 'background: #222; color: red');
    this.triggerButton = !this.triggerButton;

    let valid = this.keySlength > 3 === this.is3D;
    let valid2 = valid === this.triggerButton;

    if (this.triggerButton) {
      this.processedData = this.HeroesDataS;
    } else {
      this.processedData = this.Service.get2DChartData(this.HeroesDataS, this.statKey, true);
      console.log('The data is 2D');
    }
    this.loadChartComponent(this.processedData);

  }


  // changeNgetData(tickedInput: boolean){
  //   if (tickedInput) {
  //     this.HeroesDataS = this.Service.getDatabyKey(this.chartData, 'HEROES', 'statSetting');
  //   }
  //   else {
  //     this.processedData = this.returnDataValue(this.HeroesDataS, this.sortData);
  //   }
  // }

  // check3Dstructure(data?: any) {   // Check 3 dimensional data
  //   let objKey: string[];
  //   objKey = Object.keys(data[0]);
  //   return objKey.slice(2).length > 1;
  // }

  ngOnDestroy() {
    this._idComponentChart = null;
  }


  /*
    displayTemplate() {
        let DItem = this.ChartDataComponent.component;
        console.log(DItem);
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(DItem);
        this.viewContainerRef = this.chartDirective.viewContainerRef;
        this.viewContainerRef.clear();
        this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
        (this.componentRef.instance as ChComponentInt).data = this.ChartDataComponent.data;
        console.log((this.componentRef.instance as ChComponentInt).data);
        (this.componentRef.instance as ChComponentInt).setting = this.ChartDataComponent.setting[0];
        console.log((this.componentRef.instance as ChComponentInt).setting);
      // (componentRef.instance as ChComponentInt).key = this.ChartDataComponent.key[0];
      // console.log((componentRef.instance as ChComponentInt).key);
    }
  */
}
