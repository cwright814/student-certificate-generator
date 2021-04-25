import IJob from "../interfaces/Job";
import ITask from "../interfaces/Task";
import yieldImmediate from "@/utilities/YieldImmediate";

export default class Job implements IJob {
  public id: number;
  public tasks: ITask[];
  protected completedTasks: number;

  public constructor(id: number, tasks: ITask[] = []) {
    this.id = id;
    this.tasks = tasks;
    this.completedTasks = 0;
  }

  public async run(callback?: () => void): Promise<any> {
    const totalTasks = this.totalTasks;
    let previousReturn: any;
    this.completedTasks = 0;

    for (let i = 0; i < totalTasks; i++) {
      const task = this.tasks[i];

      try {
        previousReturn = await task.run(previousReturn);
      } catch (error) {
        // @DEBUG Log error stack trace
        if (process.env.NODE_ENV === "development") {
          console.log(`Job #${this.id} failed on task \"${task.friendlyName}\":`, error.stack);
        }
        throw new Error(`${task.friendlyName} ${error.toString()}`);
      }

      this.completedTasks += 1;

      if (typeof callback === "function") {
        callback();
        await yieldImmediate();
      }
    }

    return previousReturn;
  }

  public get progress(): number {
    return this.completedTasks / this.totalTasks;
  }

  protected get totalTasks(): number {
    return this.tasks.length;
  }
}
