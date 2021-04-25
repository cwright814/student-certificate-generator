import Job from "@/classes/Job";
import Student from "./Student";
import ICertificateForm from "../interfaces/CertificateForm";
import GenerateCertificate from "./tasks/GenerateCertificate";
import DownloadFile from "./tasks/DownloadFile";

export default class extends Job {
  public constructor(id: number, form: ICertificateForm, formStudent: Student) {
    super(id);

    this.tasks.push(new GenerateCertificate(form.class, formStudent));
    this.tasks.push(new DownloadFile(formStudent));
  }
}
