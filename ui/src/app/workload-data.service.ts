import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Workload} from './model/workload';

@Injectable({
  providedIn: 'root'
})
export class WorkloadDataService {

    private baseUrl = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) {}

    getInitialWorkloadData() {
        return this.httpClient
            .get<any[]>(`${this.baseUrl}/api/workload`);
    }
}
