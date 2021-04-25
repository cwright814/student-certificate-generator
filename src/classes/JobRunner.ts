import IJob from "@/interfaces/Job";
import { Promise } from "bluebird";
import config from "@/config.json";

export default class JobRunner {
  public readonly concurrency: number;
  public jobs: IJob[];

  public constructor(jobs: IJob[] = [], params: {concurrency?: number} = {}) {
    const options = {...config.default.jobRunner, ...params};

    if (!options.concurrency || options.concurrency < 0) {
      options.concurrency = 1;
    }

    this.concurrency = options.concurrency;
    this.jobs = jobs;
  }

  public async run(callback?: (runCompletion: number) => void): Promise<any[]> {
    // Update jobrunner progress as job tasks are completed
    const progressCallback = (): void => this.jobProgressCallback(callback);

    // Run jobs with concurrency
    return await Promise.map(this.jobs, (job) => job.run(progressCallback), {concurrency: this.concurrency});
  }

  protected jobProgressCallback(callback?: (runCompletion: number) => void): void {
    // Ignore progress if lacking callback
    if (typeof callback !== "function") {
      return;
    }

    const jobCount = this.jobs.length;
    let totalProgress = 0;

    for (let i = 0; i < jobCount; i++) {
      const job = this.jobs[i];
      totalProgress += job.progress;
    }

    const runCompletion = totalProgress / jobCount;
    callback(runCompletion);
  }
}
