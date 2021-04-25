import IJob from "./Job";

export default interface IJobFactory {
  createJobs(...args: any[]): IJob[];
}
