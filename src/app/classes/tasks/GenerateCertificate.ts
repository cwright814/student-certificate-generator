import * as PDFForm from "pdfform";
import IGenerateCertificate from "../../interfaces/tasks/GenerateCertificate";
import IClass from "../../interfaces/Class";
import IStudent from "../../interfaces/Student";
import AwardType from "../../enums/AwardType";
import { formatDate } from "@/utilities/Dayjs";
import config from "@/config.json";

export default class GenerateCertificate implements IGenerateCertificate {
  public readonly friendlyName = "Generate Certificate";
  public class: Omit<IClass, "finalTime">;
  public student: IStudent;

  public constructor(formClass: IClass, formStudent: IStudent) {
    const {name, finalDate} = formClass;
    this.class = {name, finalDate: formatDate(finalDate)};
    this.student = formStudent;
  }

  public async run(): Promise<Uint8Array> {
    // Fetch template as arraybuffer
    const response = await fetch(this.templatePath);
    const inputBuffer = await response.arrayBuffer();

    // @DEBUG Output all detected form fields
    if (process.env.NODE_ENV === "development" && process.env.VUE_APP_DEBUG === "verbose") {
      console.log("Template fields:", PDFForm.listFields(inputBuffer));
    }

    // Fill form using key/[value] pairs
    const outputBuffer = PDFForm.fillForm(inputBuffer, {
      "Class-Name": [this.class.name],
      "date": [this.class.finalDate],
      "name": [this.student.name]
    });

    return outputBuffer;
  }

  public get templatePath(): string {
    return `templates/${this.templatePrefix}Class_Completion_Certificate.${this.templateExtension}`;
  }

  protected get templatePrefix(): string {
    switch (this.student.awardType) {
      case AwardType.HighHonors:
        return "HH_";
      case AwardType.Honors:
        return "H_";
      default:
        return "";
    }
  }

  protected get templateExtension(): string {
    return config.app.certificateFileExtension;
  }
}
