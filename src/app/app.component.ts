import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DynamiChart';
  IdChartComponent: any;
  OnClick: boolean;

  getChartCompID(e: any) {
    this.IdChartComponent = e;
    console.log(e);
  }

  getClickTriger(e: any) {
    this.OnClick = e;
  }
}
