import { Component, OnInit } from '@angular/core';
import { Candidate } from '../models/candidate'
import { CandidateJob } from '../models/candidate-job'
import { CandidatesService } from '../services/candidates.service';
import { JobsService } from '../services/jobs.service'
import {
  PoTableAction,
} from '@po-ui/ng-components';
import { CandidateJobService } from '../services/candidate-job.service';


@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  candidates: Candidate[] = []
  jobs: any = []
  selectedJobID: any;
  file: any;
  columns: any = [
    { property: 'id', label: 'ID', type: 'number' },
    { property: 'name', label: 'Nome', type: 'string' },
    { property: 'file', label: 'CV', type: 'link', action: (a: any) => window.open(a, '_blank') },
  ]

  candidate: Candidate;
  actions: Array<PoTableAction>;

  isEdit = false;
  btnLabel = 'Novo Candidato'

  constructor(private candidatesService: CandidatesService, private jobsServices: JobsService, private candidateJobService: CandidateJobService) {
    this.actions = [{
      label: 'Editar',
      action: (candidate: Candidate) => {
        this.candidate = { ...candidate }
        this.toggleEditMode()
        console.log(candidate)
      }
    },
    {
      label: "Deletar",
      action: async (candidate: Candidate) => {
        const { id } = candidate
        await this.candidatesService.delete(id)
        await this.getCandidates()
      }
    }
    ]

    this.candidate = {
      name: '',
      candidateJobs: [],
      file: '',
      fileID: '',
      blobFile: {
        name: '',
        data: '',
      }
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getJobs()
    await this.getCandidates()
  }

  async getCandidates(): Promise<void> {
    this.candidates = await this.candidatesService.get()
  }

  async getJobs(): Promise<void> {
    const jobs = await this.jobsServices.get()
    this.jobs = jobs.map(({ id, title }) => ({ label: title, value: id }))
  }

  async createCandidate(): Promise<void> {
    const { id }: Candidate = await this.candidatesService.create(this.candidate)
    await this.handleCreateCandidateJob(id)
    this.cleanForm()
    await this.getCandidates()
  }

  async handleCreateCandidateJob(candidateID: number | undefined) {
    this.selectedJobID = +this.selectedJobID
    const body = {
      candidateID: candidateID,
      jobID: this.selectedJobID
    }
    await this.candidateJobService.create(body)
  }

  async updateCandidate() {
    await this.candidatesService.update(this.candidate)
    await this.getCandidates()

    this.cleanForm()
  }

  toggleEditMode() {
    this.isEdit = !this.isEdit;
    this.btnLabel = this.isEdit ? "Editar Vaga" : "Nova Vaga"
  }


  cleanForm() {
    this.selectedJobID = undefined
    this.candidate = {
      name: '',
      candidateJobs: [],
      file: '',
      fileID: '',
      blobFile: {
        name: '',
        data: '',
      }
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.candidate.blobFile.name = file.name
      this.candidate.blobFile.data = reader.result?.toString()
        .replace("data:", "")
        .replace(/^.+,/, "")
    };
  }

}