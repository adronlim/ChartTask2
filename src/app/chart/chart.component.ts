import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChartDirective} from '../chart-directive.directive';
import {ChartDataComponent} from '../ChartData';
import {ServicesService} from '../services.service';
import {BarChartComponent} from '../bar-chart/bar-chart.component';
import {StackedBarChartComponent} from '../stacked-bar-chart/stacked-bar-chart.component';
import {PieChartComponent} from '../pie-chart/pie-chart.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  styleHeight: {};
  styleError: string;
  styleContainer: string; //Styling for Container
  styleChart: string; //Styling for Chart
  _idComponentChart: any;
  dItem: ChartDataComponent[];
  HeroesDataS?: any;
  keySlength: number;
  key?: any;
  statKey?: any;
  getProcessedDataKeys: any;
  chartData?: any;
  // Data3d: any;
  // Data2d: any;
  // DataHis: any;
  // DataPie: any;
  ChartDataComponent: ChartDataComponent;
  is3D: boolean;  // The ability of chart to support data structure
  first = true;
  triggerButton = true;
  sortData: boolean;
  processedData: any;
  currentIndex: number;
  chartComponents: any;
  // inputElement: any;
  subscription: Subscription;
  // messageError$ = new Subject<boolean>().asObservable();
  @ViewChild(ChartDirective) chartDirective: ChartDirective;
  @ViewChild('inputCB') inputCB?: ElementRef;
  @Input() onClick: boolean;

  @Input() showError: boolean;

  @Input()
  set idComponentDB(idComponentDB: any) {
    this._idComponentChart = idComponentDB;
  }
  get idComponentDB(): any {
    return this._idComponentChart;
  }

  constructor(private Service: ServicesService) {
    this.chartComponents = ChartComponent.getChartComponent();
    console.log(this.chartComponents);
  }

  static getChartComponent() {
    return [BarChartComponent, PieChartComponent, BarChartComponent, StackedBarChartComponent];
  }

  ngOnInit() {
    this.showError = false;

    this.Service.messageError$.subscribe(error => {
      console.log('%cSUBSCRIBE!!!! CHARTCOMPONENT', 'background: #222; color: #bada55');
      console.log(error);
      setTimeout(() => {    //<<<---    using ()=> syntax
        this.showError = error;
        if (!error) {
          this.styleChart = 'container';
          this.styleContainer = 'container';
          this.styleError = 'noDisplay';
          this.styleHeight = {'height': '800px'};
        } else {
          this.styleChart = 'noDisplay';
          this.styleContainer = 'container';
          this.styleError = 'container';
          this.styleHeight = {'height': '300px'};
        }
      });

      console.log(this.showError);
    });
    this.statKey = 'str';
    this.subscription = this.Service.get2dHeroes().subscribe(data => {
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
        console.log(this.HeroesDataS);
        console.log('HEY!');

        this.first = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('%cinput changed!!!!!!!!!! CHARTCOMPONENT', 'background: #222; color: #bada55');

    console.log(changes);
    // this.showError = changes.showError.currentValue;
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
    console.log(this.chartComponents);
    this.ChartDataComponent = new ChartDataComponent(this.chartComponents[this.currentIndex], chartDataParameter, ChartSetting, this.key, this.currentIndex);
  }

  setParameter() {
    console.log('%csetParameter!!!!!!!!!!!!!!!!!!', 'background: #222; color: red');
    switch (this._idComponentChart) {
      case 'BarChartComponent':
        this.currentIndex = 0;
        console.log(this.processedData);
        break;
      case 'PieChartComponent':
        this.currentIndex = 1;
        break;
      case 'HistogramChartComponent':
        this.currentIndex = 2;
        break;
      case 'StackedBarChartComponent':
        this.currentIndex = 3;
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
    this.getProcessedDataKeys = Object.keys(this.processedData[0][0]);
    this.keySlength = this.getProcessedDataKeys.length;
    console.log(this.getProcessedDataKeys);
    console.log(this.keySlength);
  }

  check() {
    console.log('%cCHECK!!!!!!!!!!!!!!!!!!', 'background: #222; color: red');
    this.triggerButton = !this.triggerButton;

    if (this.triggerButton) {
      this.processedData = this.HeroesDataS;
    } else {
      this.processedData = this.Service.get2DChartData(this.HeroesDataS, this.statKey, true);
      console.log('The data is 2D');
    }
    this.loadChartComponent(this.processedData);
  }
  ngOnDestroy() {
    this._idComponentChart = null;
    this.subscription.unsubscribe();
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
  /*
    displayTemplate() {
        let DItem = this.ChartDataComponent.component;
        console.log(DItem);
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(DItem);
        this.viewContainerRef = this.chartDirective.viewContainerRef;
        this.viewContainerRef.Error();
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
