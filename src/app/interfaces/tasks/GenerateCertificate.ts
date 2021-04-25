import ITask from "@/interfaces/Task";
import IClass from "../Class";
import IStudent from "../Student";

export default interface IGenerateCertificate extends ITask {
  class: Omit<IClass, "finalTime">;
  student: IStudent;
}
