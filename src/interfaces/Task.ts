import IJob from "./Job";

export default interface ITask {
  readonly friendlyName: string;
  job?: IJob;
  run(previousReturn: any): Promise<any>;
}
