import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChartDirective} from '../chart-directive.directive';
import {ChartDataComponent} from '../ChartData';
import {ServicesService} from '../services.service';

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
  key?: any;
  showError = false;
  statKey?: any;
  chartData?: any;
  ChartDataComponent: ChartDataComponent;
  is3D: boolean;
  sortData: boolean;
  dStructureChange = false;
  multiYvalue: boolean;
  processedData: any;
  currentIndex: number;
  chartComponents: any;
  structureError = false;
  @ViewChild(ChartDirective) chartDirective: ChartDirective;
  @Input() onClick: boolean;
  @Input()
  set idComponentDB(idComponentDB: any) {
    this._idComponentChart = idComponentDB;
  }
  get idComponentDB(): any {
    return this._idComponentChart;
  }

  constructor(/*private componentFactoryResolver: ComponentFactoryResolver, */private Service: ServicesService,) {
    // this.chartData = this.waitService();
    this.chartComponents = this.Service.getChartComponent();
    console.log(this._idComponentChart);
    console.log(this.chartData);
  }

  // async waitService(): Promise<any> {
  //   let data =  await this.Service.Data;
  //   console.log(data);
  //   return data;
  // }
  ngOnInit() {
    // this.waitService().then( result => console.log(result));
    // this.chartData = this.waitService();
    console.log(this._idComponentChart);
    console.log(this.chartData);
  }
  ngOnChanges(changes: SimpleChanges) {
    if ((changes.idComponentDB.currentValue != changes.idComponentDB.previousValue) && changes.idComponentDB.previousValue) {
      this.setParameter();
      //
      //   if (changes.idComponentDB.currentValue > 2 || changes.idComponentDB.previousValue < 3 ) {
      //
      //     this.TriggerChange = true;
      //     // this.setParameter();
      //     // console.log('%cinput changed!!!!!!!!!!', 'background: #222; color: #bada55');
      //     // console.log(changes);
      //     // console.log(this._idComponentChart);
      //
      //     // // **** this.chartData.sort((a, b) => a[this.key[2]] - b[this.key[2]]); // To sort elements by key
      //     // this.loadChartComponent();
      //   } else if (changes.idComponentDB.previousValue > 2 || changes.idComponentDB.currentValue < 3 ) {
      //       this.
      //   }
      this.loadChartComponent(this.processedData);
      //
    }
  }
  ngAfterViewInit() {
    this.statKey = 'str';
    this.Service.get2dHeroes().subscribe(data => {
      // this.TriggerChange = false;
      // this.dStructureChange = true;
      console.log(data);
      if (this.Service.findKeyAvailable(data, 'HEROES', 'statSetting')) {

        // this.Service.processRawDatabyKey(data,);
        this.chartData = data;
        this.HeroesDataS = this.Service.getDatabyKey(this.chartData, 'HEROES', 'statSetting');

        this.setParameter(); // To get value of currentIndex & multiYvalue
        console.log(this.chartData);
        this.loadChartComponent(this.processedData);
        console.log(this._idComponentChart);
        console.log(typeof this.chartData + ': \n', this.chartData + ' \n');
        console.log(this.processedData);
      }
    });
  }

  loadChartComponent(data?: any) {
    let chartDataParameter = [];
    let ChartSetting: any;
    this.key = Object.keys(data[0][0]);

    if (!this.multiYvalue) { // If the data is 2D type
      // this.processedData = this.chartData.slice(0, this.chartData.length - 1);
      console.log(this.processedData);
      chartDataParameter = [...data[0]];
      // chartDataParameter = data[0].slice(0, data[0].length - 1);
      ChartSetting = data[1];

      console.log(this.key);
      // For 2D data structure
      // chartDataParameter = this.HeroesDataS[0].slice(0, this.HeroesDataS[0].length - 1);
      // this.HeroesDataS[0].forEach(e => {
      //   chartDataParameter.push({name: e.name, [this.key]: e[this.key]});
      // });
      // console.log(` ${name}    ${e.name} $\n} ${[this.key]} ${e[this.key]} `);
      console.log(chartDataParameter);
      console.log(this.key);
      console.log(ChartSetting);
      this.ChartDataComponent = new ChartDataComponent
      (this.chartComponents[this.currentIndex], chartDataParameter, ChartSetting, this.key);
    } else {
      console.log(this.HeroesDataS);
      this.ChartDataComponent = new ChartDataComponent
      (this.chartComponents[this.currentIndex], this.HeroesDataS, ChartSetting, this.key);
      console.log(this.ChartDataComponent);
    }
  }

  returnDataValue(data, sortData: boolean) {

    if (!this.multiYvalue) {
      console.log(data);
      return this.Service.getChartData(data, this.statKey, sortData, this.currentIndex);
    } else if (this.multiYvalue) {
      // this.Service.sortDataFunc();
      return data;
    }
  }

  // sortDataFunction(data, sortData) {
  //   if (sortData) {
  //     this.Service.sortDataFunc();
  //   }
  // }
  setParameter() {
    switch (this._idComponentChart) {
      case 'BarChartComponent':
        this.currentIndex = 0;
        this.multiYvalue = false;
        this.sortData = true;
        this.processedData = this.returnDataValue(this.HeroesDataS, this.sortData);
        console.log(this.processedData);
        break;
      case 'PieChartComponent':
        this.currentIndex = 1;
        this.multiYvalue = false;
        this.sortData = false;
        this.processedData = this.returnDataValue(this.HeroesDataS, this.sortData);
        break;
      case 'HistogramChartComponent':
        this.currentIndex = 2;
        this.multiYvalue = false;
        this.sortData = true;
        this.processedData = this.returnDataValue(this.HeroesDataS, this.sortData);
        break;
      default:
        return;
    }
  }

  check3Dstructure(data?: any) {
    let objKey: string[];
    objKey = Object.keys(data[0]);
    return objKey.slice(2).length > 1;
  }

  ngOnDestroy() {
    this._idComponentChart = null;
    // this.displayTemplate();
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
