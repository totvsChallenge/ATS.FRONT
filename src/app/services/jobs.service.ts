import { Injectable } from '@angular/core';
import { Job } from '../models/job'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  uri = "https://atstovsapi.azurewebsites.net/api/Job";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private httpClient: HttpClient) { }


  async get(): Promise<Job[]> {
    return this.httpClient.get<Job[]>(this.uri).toPromise()
  } 

  async createJob(job: Job): Promise<void> {
    const body = job
    await this.httpClient.post<Job>(this.uri, body, this.httpOptions).toPromise()
  }

  async update(job: Job): Promise<void> {
    const { id, ...data } = job
    const body = JSON.stringify(data)
    await this.httpClient.put<Job>(`${this.uri}/${id}`, body, this.httpOptions).toPromise()
  }

  async delete(jobID?: number): Promise<void> {
    await this.httpClient.delete(`${this.uri}/${jobID}`).toPromise()
  }
}
