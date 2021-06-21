import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  uri = "https://atstovsapi.azurewebsites.net/api/Candidate";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private httpClient: HttpClient) { }

  async get(): Promise<Candidate[]> {
    return this.httpClient.get<Candidate[]>(this.uri).toPromise()
  } 


  async delete(candidateID?: number): Promise<void> {
    await this.httpClient.delete(`${this.uri}/${candidateID}`).toPromise()
  }

  async create(candidate: Candidate): Promise<Candidate> {
    const body = JSON.stringify(candidate)
    return await this.httpClient.post<Candidate>(this.uri, body, this.httpOptions).toPromise()
  }

  async update(candidate: Candidate): Promise<void> {
    const { id, ...data } = candidate
    const body = JSON.stringify(data)
    await this.httpClient.put<Candidate>(`${this.uri}/${id}`, body, this.httpOptions).toPromise()
  }
}
