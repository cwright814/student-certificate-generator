import JobRunner from "@/classes/JobRunner";
import IJob from "@/interfaces/Job";
import config from "@/config.json";

export default class extends JobRunner {
  public constructor(jobs: IJob[] = []) {
    super(jobs, config.app.jobRunner);
  }
}
