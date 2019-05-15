import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() onClick: any;
  _idComponentDB: any;
  id_Component_DB: any;

  @Input()
  set idComponentDB(idComponentChart: any) {
    this._idComponentDB = idComponentChart;
  }

  constructor() {
  }

  get idComponentDB(): any {
    return this._idComponentDB;
  }
  ngOnInit() {
    console.log('ngOnInit \n', this._idComponentDB);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit \n', this._idComponentDB);
    this.id_Component_DB = this._idComponentDB;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.idComponentDB) {
      console.log('%cinput changed!!!!!!!!!!', 'background: #222; color: #bada55');
      console.log(changes);
    }
  }
  ngOnDestroy(): void {
    this._idComponentDB = null;
  }
  concon() {
    console.log(this._idComponentDB);
  }
}
