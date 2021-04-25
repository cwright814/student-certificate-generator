import IStudent from "../interfaces/Student";
import AwardType from "../enums/AwardType";
import { includesTwice } from "@/utilities/Array";

export default class Student implements IStudent {
  public id: number;
  public name: string;
  public awardType: AwardType;

  public constructor(id: number) {
    this.id = id;
    this.name = "";
    this.awardType = AwardType.Standard;
  }

  public nameExistsTwice(studentNames: string[]): boolean {
    return includesTwice(studentNames, this.name);
  }

  public get id1Based(): number {
    return this.id + 1;
  }

  public get header(): string {
    if (!this.name) {
      return `Student ${this.id + 1}`;
    }

    return `${this.name} ${this.headerSuffix}`.trim();
  }

  protected get headerSuffix(): string {
    switch (this.awardType) {
      case AwardType.HighHonors:
        return "(HH)";
      case AwardType.Honors:
        return "(H)";
      default:
        return "";
    }
  }
}
