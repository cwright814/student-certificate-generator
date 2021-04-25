import IJobFactory from "@/interfaces/JobFactory";
import ICertificateForm from "../interfaces/CertificateForm";
import IJob from "@/interfaces/Job";
import Job from "./Job";
import StaticImplements from "@/utilities/StaticImplements";

@StaticImplements<IJobFactory>()
export default class {
  public static createJobs(form: ICertificateForm): IJob[] {
    const jobs: IJob[] = [];
    const numberOfStudents = form.students.length;

    for (let i = 0; i < numberOfStudents; i++) {
      const student = form.students[i];
      const job = new Job(i, form, student);

      jobs.push(job);
    }

    return jobs;
  }
}
