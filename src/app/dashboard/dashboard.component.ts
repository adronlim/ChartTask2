import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() onClick: any;

  constructor() {
  }

  _idComponentDB: any;

  get idComponentDB(): any {
    return this._idComponentDB;
  }

  @Input()
  set idComponentDB(idComponentChart: any) {
    this._idComponentDB = idComponentChart;
  }

  ngOnInit() {
    console.log('ngOnInit \n', this._idComponentDB);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit \n', this._idComponentDB);
  }

  ngOnDestroy(): void {
    this._idComponentDB = null;
  }

  concon() {
    console.log(this._idComponentDB);
  }
}
