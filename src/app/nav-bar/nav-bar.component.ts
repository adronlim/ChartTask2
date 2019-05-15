import {AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit, AfterViewInit, OnChanges {
  idComponent: any;
  @Output() idEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickTruthEmitter: EventEmitter<any> = new EventEmitter<any>();

  // @Output() stackEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }

  onClickId(e: any) {
    let click = true;
    this.idComponent = e.target.id;
    this.idEmitter.emit(this.idComponent);
    this.clickTruthEmitter.emit(click);
    console.log('OnClickId \n', this.idComponent);
  }

  onReload() {
    location.reload();
  }

  ngOnInit() {
    console.log('ngOnint \n', this.idComponent);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.input) {
      console.log('%cinput changed!!!!!!!!!!', 'background: #222; color: #bada55');
      console.log(changes);
    }
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit \n', this.idComponent);
  }
}
