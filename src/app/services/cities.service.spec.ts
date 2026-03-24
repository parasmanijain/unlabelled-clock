import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CitiesService, City } from './cities.service';

describe('CitiesService', () => {
  let service: CitiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitiesService],
    });
    service = TestBed.inject(CitiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cities from API', () => {
    const mockCities: City[] = [
      { id: 1, name: 'New York', country: 'USA' },
      { id: 2, name: 'London', country: 'UK' },
    ];

    service.getCities().subscribe((cities) => {
      expect(cities).toEqual(mockCities);
      expect(cities.length).toBe(2);
    });

    const req = httpMock.expectOne('assets/json/cities.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);
  });

  it('should handle HTTP errors gracefully', () => {
    service.getCities().subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne('assets/json/cities.json');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});
