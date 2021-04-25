import IClass from "./Class";
import Student from "../classes/Student";

export default interface ICertificateForm {
  class: IClass;
  numberOfStudents: number | null;
  students: Student[];
}
