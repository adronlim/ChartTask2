import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {HistogramChartComponent} from './histogram-chart/histogram-chart.component';
import {PieChartComponent} from './pie-chart/pie-chart.component';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  Data: any;

  constructor(private httpClient?: HttpClient) {
  }

  getHeroes(): Observable<any> {
    return this.httpClient.get<any>('../assets/Heroes.json');
  }

  getDataURL(url: string): Observable<any> {
    console.log(url);
    return this.httpClient.get<any>(url);
  }

  getChartData(component: Array<any>, dataFunc) {
    // this.Data = dataFunc();
    // return new ChartDataComponent( component, this.Data);
  }

  // set
  // get
  public requestDataFromMultipleSources()
  // : Observable<any[]>
  {
    // let response1 = this.httpClient.get(requestUrl1);
    // let response2 = this.httpClient.get(requestUrl2);
    // let response3 = this.httpClient.get(requestUrl3);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    // return forkJoin([response1, response2, response3]);
  }

  getChartDataURL() {
    return this.httpClient.get<any>('../assets/CharData.json');
  }

  getChartComponent() {
    return [BarChartComponent, PieChartComponent, HistogramChartComponent];
  }

}
