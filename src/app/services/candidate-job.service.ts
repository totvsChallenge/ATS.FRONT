import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CandidateJob } from '../models/candidate-job'

@Injectable({
  providedIn: 'root'
})
export class CandidateJobService {
  uri = "https://atstovsapi.azurewebsites.net/api/CandidateJob";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private httpClient: HttpClient) { }

  async create(candidateJob: CandidateJob): Promise<void> {
    const body = JSON.stringify(candidateJob)
    console.log
    await this.httpClient.post<CandidateJob>(this.uri, body, this.httpOptions).toPromise()
  }
}