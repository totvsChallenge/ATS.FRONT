import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service'
import { Job } from '../models/job'

import {
  PoTableAction,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[]
  job: Job
  actions: Array<PoTableAction>;
  btnLabel = "Nova Vaga"
  isEdit = false;

  constructor(private jobsService: JobsService) {
    this.actions = [
      {
        label: 'Editar',
        action: (job: Job) => {
          this.job = { ...job }
          this.toggleEditMode()

        }
      },
      {
        label: "Deletar",
        action: async (job: Job) => {
          const { id } = job
          await this.jobsService.delete(id)
          await this.getJobs()
        }

      }],
      this.jobs = []

    this.job = {
      title: '',
      description: '',

    }
  }

  async ngOnInit(): Promise<void> {
    await this.getJobs()
  }

  async getJobs(): Promise<void> {
    this.jobs = await this.jobsService.get();
    console.log(this.jobs)
  }

  async createJob() {
    await this.jobsService.createJob(this.job)
      .then(() => this.getJobs());
    this.cleanForm()
  }

  async updateJob() {
    await this.jobsService.update(this.job)
    this.toggleEditMode()
    this.cleanForm()
    await this.getJobs()
  }

  cleanForm() {
    this.job = {
      title: '',
      description: '',
    }
  }

  toggleEditMode() {
    this.isEdit = !this.isEdit
    this.btnLabel = this.isEdit ? 'Editar Vaga' : 'Nova Vaga'
  }

}
