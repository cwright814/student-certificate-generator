import ITask from "@/interfaces/Task";
import ICertificateForm from "../CertificateForm";
import IStudent from "../Student";

export default interface IDownloadFile extends ITask, Omit<ICertificateForm, "class"|"numberOfStudents"|"students"> {
  student: IStudent;
}
