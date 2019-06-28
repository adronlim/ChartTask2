import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {time} from '@amcharts/amcharts4/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  Data2D: any;
  Data3D: any;
  key: any;
  statKey: string;
  statKeys: [];
  settingKeys: [];


  constructor(private httpClient?: HttpClient) {
    const a = [1, 2, 3, 4];
    console.log('a  \n');
    console.log(typeof []);
    const b = [[1, 2, 3], [4, 5, 6]];
    console.log('b  \n');
    console.log(typeof [[], []]);
    const c = {};
    console.log('c  \n' + typeof {});
    console.log(this.Data2D);
  }

//******  To set the variable of the key   ******

  static getChartId(min, max) {
    // console.log(time.getTime());
    // console.log(typeof  time);
    let hoursMinutes = time.getTime();
    let Times = parseInt(hoursMinutes.toString(), 10);
    // console.log(Times);
    let influencer = Times % 100;
    min = Math.ceil(min);
    max = Math.floor(max);
    // console.log(influencer);
    // console.log((Math.floor(Math.random() * (max - min )) + min));
    return (Math.abs(Math.floor(Math.random() * (max - min - influencer)) + min).toString()); //The maximum is exclusive and the minimum is inclusive
  }

//   indexB = true for Multiple Keys, false for single Key
  setKeys(indexB: boolean, Keys: any) {
    if (indexB == true) {
      this.statKeys = Keys;
    } else {
      this.statKey = Keys;
    }
  }

  //
  getKeys(data) {
    return Object.keys(data);
  }

  setData2D() {

  }

  setData3D(rawData: any) {
    this.Data3D = rawData;
  }
  getHeroes(): Observable<any> {
    return this.httpClient.get<any>('../assets/Heroes.json');
  }
  getDataURL(url: string): Observable<any> {
    console.log(url);
    return this.httpClient.get<any>(url);
  }

  // get2DChartData(component: Array<any>, dataFunc) {
  //   // this.Data = dataFunc();
  //   // return new ChartDataComponent( component, this.Data);
  // }
  public requestDataFromMultipleSources() {
    // let response1 = this.httpClient.get(requestUrl1);
    // let response2 = this.httpClient.get(requestUrl2);
    // let response3 = this.httpClient.get(requestUrl3);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    // return forkJoin([response1, response2, response3]);
  }
  getChartDataURL() {
    return this.httpClient.get<any>('../assets/Heroes.json');
  }

  get2dHeroes() {
    return this.httpClient.get<any>('../assets/Heroes.json');
  }
  dataSample() {
    let newData;
    newData = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 0];
    return newData;
  }
  findKeyAvailable(rawData: [], key1, key2?, key3?): boolean {  // Find the Object key from object-typed RAW Data & 2D use
    let data;
    let keyArray = [];
    keyArray.push(key1);
    keyArray.push(key2);
    keyArray.push(key3);  // key to find intended data
    let dKey = Object.keys(rawData);
    let i = 0;
    let result = true;
    for (const key of keyArray) {
      if (key !== null && key !== undefined) {
        result = result && dKey.includes(key);
        if (!result) {
          break;
        }
      }
    }
    return result;
  }

  // returnDataValue(index, statKey, data, sortData: boolean) {
  //   if (index == -1) {
  //     console.log(data);
  //     return this.get2DChartData(data, this.statKey, sortData, index);
  //   } else if (index == 1) {
  //     return data;
  //   }
  // }
  getDatabyKey(data, key1: string | number, key2?: string | number, key3?: string | number) { // Get intended data(Object) by key
    const ObjKey = Object.keys(data);
    let keyArray = [];
    keyArray.push(key1);
    keyArray.push(key2);
    keyArray.push(key3);  // keys Array to find intended data
    const i = 0;
    let newdata = [];
    for (let key of keyArray) {
      if (key !== null && key !== undefined) {
        newdata.push(data[key]);
      }
    }
    // console.log(newdata);
    this.Data3D = newdata;
    return newdata;
  }


  get2DChartData(rawData: any, key: string, sortData: boolean/*, index: number*/) {
    // Process raw data into ### 2D data ### for Chart Display
    // Only accept '[]' format for 2D rawData
    // To get intended object property(s) by key
    let data2D = [[], []];
    let newData1 = [];
    let newData2 = [];
    let newObjH = {};
    let newObjSet = {};
    let dataKey: any;
    // console.log(data2d);
    // console.log(data2d[0]);

    let ObjKeyH = Object.keys(rawData[0][0]);    // Get Array Keys of Hero Stat
    let ObjSettingKey = Object.keys(rawData[1][0]); // Get Array keys of StatSetting(Configuration)
    console.log(ObjSettingKey);
    // console.log(key);
    // console.log(ObjKeyH);
    dataKey = Object.keys(rawData);      // Get key from data2d
    let stateKey = ObjKeyH.find(e => {
      return e == key;
    });
    if (stateKey === undefined || stateKey === null) {
      window.alert('The stateKey is not FOUND!!! \n line 144 Service');
      console.log('%c The stateKey is not FOUND!!!', 'background: #222; color: #bada55');
      return;
    }
    //Chart Bar Chart & Pie Chart
    dataKey.forEach(keyI => {
      // Heroes information process
      if (keyI == 0) {
        // console.log(keyI);
        // console.log(data2D);
        // console.log(data2d[0]);
        rawData[0].forEach(e1 => {
          newObjH = {[Object.keys(e1)[0]]: e1[Object.keys(e1)[0]], [Object.keys(e1)[1]]: e1[Object.keys(e1)[1]], [stateKey]: e1[stateKey]};
          newData1.push(newObjH);
          // console.log(newObjH);
          // console.log(newData1);
          // console.log(data2D[0]);
          // Sorting DATA
        });
        if (sortData) {
          newData1 = this.sortDataFunc(newData1, stateKey);
        }
      }
      // Process Configuration info for Chart
      else if (keyI == 1) {
        // console.log(keyI);
        rawData[1].forEach(e2 => {
          // console.log(e2);
          if (e2.statID == stateKey) {
            newObjSet = {
              [Object.keys(e2)[0]]: e2[ObjSettingKey[0]],
              [Object.keys(e2)[1]]: e2.statName,
              [Object.keys(e2)[2]]: e2.statColor
            };
            newData2.push(newObjSet);
            // console.log(newData2);
          }
        });
      } else {
        // console.log('The system does not recognize the data key!!!!!'); // To indicate that data input error as the variable does not recognize the data key
        return;
      }
    });
    data2D[0] = (newData1);
    data2D[1] = newData2[0];
    // console.log(data2D[1]);
    // if (index == 2) {
    //   // Histogram Chart
    //   data2D = this.histogramData(data2D, key);   // return histogram data only (1 Dimensional Array)
    // }
    // console.log(data2D);
    return data2D;
  }

  histogramData(rawData: any, key: any) { // rawData is *** 2 Dimensional *** Array
    let hisData = [];
    let hisKeys = ['degree', 'freq'];
    let i = 0;  // loop index
    let h = 0;  // index that count element number of hisData
    // Count the frequency for histogram chart
    console.log(hisData);
    console.log(rawData);
    // let settingKeys = Object.keys(Setting);
    const ObjKeyH = Object.keys(rawData[0]);
    console.log(ObjKeyH);
    const stateKey = ObjKeyH.find(e => {
      return e == key;
    }) || 'KEY NOT FOUND';
    console.log(stateKey);
    for (let rData of rawData) {
      if (hisData[h] == undefined || hisData[h] == null) {
        console.log(rData[stateKey]);
        hisData.push({[hisKeys[0]]: rData[stateKey], [hisKeys[1]]: 0});
        console.log(hisData[h]);
        hisData[h][hisKeys[1]] = 1;
        console.log(hisData[h]);
      } else if (rawData[i + 1] === undefined || rawData[i + 1] === null) {
        console.log('Histogram Component : \n THE END OF RAWDATA LOOP');
        break;
      }
      if (rData[stateKey] === rawData[i + 1][stateKey]) {
        hisData[h][hisKeys[1]] += 1;
        console.log(hisData);
      } else {
        h++;
        // this.hisData[h].key = rData[this.Hkey];
        // this.hisData[h].freq += 1;
      }
      i++;
    }
    hisData.sort((a, b) => a[stateKey] - b[stateKey]);
    hisData.unshift({[hisKeys[0]]: null, [hisKeys[1]]: 0});
    hisData.push({[hisKeys[0]]: null, [hisKeys[1]]: 0});
    console.log(hisData);
    return [...hisData];  // Return Array with same Dimension
  }

  histogramSetting(hisData: any, Setting: any, key: any) {
    let settingKeys = Object.keys(Setting);
    let object: {};
    console.log(settingKeys[settingKeys.length - 1]);
    console.log(Setting[settingKeys[settingKeys.length - 1]]);

    object = {
      'hisID': 'Histogram',
      [settingKeys[settingKeys.length - 2]]: key,
      [settingKeys[settingKeys.length - 1]]: Setting[settingKeys[settingKeys.length - 1]]
    };
    console.log(object);
    return object;
  }

  sortDataFunc(data, keyOrIndex: string | number) {  //Sorting for ***Single Dimension Array!!! *** only
    let i: any;
    let k = Object.keys(data);
    if ((typeof keyOrIndex).toString() == 'string') {
      data.sort((a, b) => a[keyOrIndex] - b[keyOrIndex]);
    } else if (keyOrIndex === null || keyOrIndex === undefined) {
      i = 0;      // If index is null, set it as  by default
    } else if ((typeof keyOrIndex) == 'number') {
      i = keyOrIndex;
      data.sort((a, b) => a[k[i]] - b[k[i]]);

      // To choose stat key, input 2
    }
    // console.log('SORTING');
    // console.log(data);
    return [...data];
  }

  get3dHeroes() {
    const data = this.httpClient.get('../assets/Heroes.json');
    // const data3D = data.HEROES;
    // return data3D;
  }

  mapfromEntries() {
    // data2d = await data;
    // console.log(data);
    // data2d = dataFrLink['HEROES'] || null;
    // let ObjKey = Object.entries(data)[];
    // Object.fromEntries(entries);
    /* data2d['HEROES'].forEach((e, index) => {
      newObjH = {[Object.keys(e)[0]]: e.id, [Object.keys(e)[1]]: e.name, [stateKey]: e[stateKey]};
      // newObj['statSetting'] = {statename: 'S',}
      // console.log(newObj);
      // let newMap = new Map([[Object.keys(e)[0], e.id], [Object.keys(e)[1], e.name], [stateKey, e[stateKey]]]);
      // @ts-ignore
      // data2D.push(Object.fromEntries(newMap));
      data2D[0].push(newObjH);
    });*/
  }
}
