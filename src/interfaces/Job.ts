import ITask from "./Task";

export default interface IJob {
  readonly progress: number;
  id: number;
  tasks: ITask[];
  run(callback?: () => void): Promise<any>;
}
