import {TestBed} from '@angular/core/testing';

import {ServicesService} from './services.service';

describe('ServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesService = TestBed.get(ServicesService);
    expect(service).toBeTruthy();
  });
});

// // Straight Jasmine testing without Angular's testing support
// describe('ServicesService', () => {
//   let service: ServicesService;
//   beforeEach(() => { service = new ServicesService(); });
//
//   it('#getValue should return real value', () => {
//     expect(service.getValue()).toBe('real value');
//   });
//
//   it('#getObservableValue should return value from observable',
//     (done: DoneFn) => {
//       service.getObservableValue().subscribe(value => {
//         expect(value).toBe('observable value');
//         done();
//       });
//     });
//
//   it('#getPromiseValue should return value from a promise',
//     (done: DoneFn) => {
//       service.getPromiseValue().then(value => {
//         expect(value).toBe('promise value');
//         done();
//       });
//     });
// });
