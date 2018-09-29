import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class WorkloadDataService {

    private baseUrl = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) {}

    getInitialWorkloadData(): Observable<any> {
        return this.httpClient
            .get<any>(`${this.baseUrl}/api/workload`);
    }

    getHistoricalData(): Observable<any[]> {
        return null;
    }
}
