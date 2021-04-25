import * as PDFForm from "pdfform";
import IDownloadFile from "../../interfaces/tasks/DownloadFile";
import IStudent from "../../interfaces/Student";
import config from "@/config.json";

export default class DownloadFile implements IDownloadFile {
  public readonly friendlyName = "Download File";
  public student: IStudent;

  public constructor(formStudent: IStudent) {
    this.student = formStudent;
  }

  public async run(buffer: Uint8Array): Promise<unknown> {
    // Open or download the modified template
    return await PDFForm.openOrDownload(buffer, `Certificate for ${this.student.name}.${this.fileExtension}`);
  }

  protected get fileExtension(): string {
    return config.app.certificateFileExtension;
  }
}
