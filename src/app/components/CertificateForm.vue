<template>
<div
  class="certificate-form"
>
  <div
    class="top-of-page"
    ref="topOfPage"
  ></div>
  <validation-observer
    ref="observer"
    slim
  >
    <b-form
      id="form"
      class="mb-3"
      @submit.stop.prevent="commitSubmitAttempt(); onValidate(onSubmit)"
      @reset.stop.prevent="onReset"
      v-if="show"
    >
      <b-card
        header="Class Info"
      >
        <validation-provider
          name="Class Name"
          :rules="{
            required: true,
            min: minClassName,
            max: maxClassName,
            regex: regExp.printableASCII
          }"
          v-slot="{valid, errors}"
          slim
        >
          <b-form-group
            id="class-input-group-name"
            label="Class Name:"
            label-for="class-input-name"
            :description="`The class name to be used within the ${certificateFileType}.`"
          >
            <b-form-input
              id="class-input-name"
              v-model="form.class.name"
              :state="getValidationState({valid})"
              :form="'form'"
              placeholder="Enter class name"
              aria-describedby="class-live-feedback-name"
            />
            <b-form-invalid-feedback id="class-live-feedback-name">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider
          name="Final Class Date"
          :rules="{
            required: true
          }"
          v-slot="{valid, errors}"
          slim
        >
          <b-form-group
            id="class-input-group-enddate"
            label="Final Class Date:"
            label-for="class-input-enddate"
            description="Date of the final class meeting."
          >
            <b-form-datepicker
              id="class-input-enddate"
              v-model="form.class.finalDate"
              v-bind="datepickerConfig"
              :state="getValidationState({valid})"
              placeholder="Enter final class date"
              aria-describedby="class-live-feedback-enddate"
            />
            <b-form-invalid-feedback id="class-live-feedback-enddate">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider
          name="Final Class Time"
          :rules="{
            required: true
          }"
          v-slot="{valid, errors}"
          slim
        >
          <b-form-group
            id="class-input-group-endtime"
            label="Final Class Time:"
            label-for="class-input-endtime"
          >
            <b-form-timepicker
              id="class-input-endtime"
              v-model="form.class.finalTime"
              v-bind="timepickerConfig"
              :state="getValidationState({valid})"
              placeholder="Enter final class time"
              aria-describedby="class-live-feedback-enddate"
            />
            <b-form-invalid-feedback id="class-live-feedback-enddate">
              {{ errors[0] }}
            </b-form-invalid-feedback>
            <small
              tabindex="-1"
              id="class-input-group-endtime__BV_description_"
              class="form-text text-muted"
            >
              Start time of the final class meeting <div class="d-inline-block" tabindex="-1">(unused in public demo).</div>
            </small>
          </b-form-group>
        </validation-provider>
      </b-card>

      <b-card
        header="Student Info"
      >
        <validation-provider
          name="Number of Students"
          :rules="{
            required: true,
            numeric: true,
            min_value: minStudents,
            max_value: maxStudents
          }"
          v-slot="{valid, errors}"
          slim
        >
          <b-form-group
            id="students-input-group-numberof"
            :class="{'mb-4': !invalidStudents}"
            label="Number of Students:"
            label-for="students-input-numberof"
            description="Number of students in the class who need a certificate."
          >
            <b-form-input
              id="students-input-numberof"
              v-model="form.numberOfStudents"
              :state="getValidationState({valid})"
              :form="'form'"
              @input="onNumberOfStudentsChanged"
              type="number"
              placeholder="Enter number of students"
              aria-describedby="students-live-feedback-numberof"
            />
            <b-form-invalid-feedback id="students-live-feedback-numberof">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <div v-for="student in filteredStudents" :key="student.id">
          <student-form :student="student"/>
        </div>
      </b-card>

      <b-button
        type="submit"
        variant="primary"
        :title="submitTooltip"
      >Submit</b-button>
      <b-button
        type="reset"
        variant="danger"
        :title="resetTooltip"
        :disabled="formPristine"
      >Reset</b-button>
    </b-form>
  </validation-observer>

  <modal-submit-review
    :students="filteredStudents"
    :className="form.class.name"
    @dismiss="onSubmitReviewDismissed"
    @ok="onSubmitReviewOK"
  />
  <modal-submit-processing
    :submitProgress="submitProgress"
  />
  <modal-submit-success
    :className="form.class.name"
    @ok="onSubmitSuccessOK"
  />
</div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ValidationObserver } from "vee-validate";
import StudentForm from "../components/StudentForm.vue";
import ModalSubmitReview from "./modals/SubmitReview.vue";
import ModalSubmitProcessing from "./modals/SubmitProcessing.vue";
import ModalSubmitSuccess from "./modals/SubmitSuccess.vue";
import ICertificateForm from "../interfaces/CertificateForm";
import IClass from "../interfaces/Class";
import Student from "../classes/Student";
import JobFactory from "../classes/JobFactory";
import JobRunner from "../classes/JobRunner";
import BvModalWrapper from "../classes/BvModalWrapper";
import dayjs from "dayjs";
import dayjsDuration from "dayjs/plugin/duration";
import { roundMinutes } from "@/utilities/Dayjs";
import { getValidationState, getValidationStateForSelect } from "@/utilities/VeeValidate";
import { cleanString, isStringPrintableASCII, isStringS3Safe } from "@/utilities/String";
import regExp, { RegExpCollection } from "@/utilities/RegExp";
import config from "@/config.json";

dayjs.extend(dayjsDuration);

@Component({
  components: {
    StudentForm,
    ModalSubmitReview,
    ModalSubmitProcessing,
    ModalSubmitSuccess
  }
})
export default class CertificateForm extends Vue {
  public readonly datepickerConfig = {
    "hide-header": true,
    "date-format-options": {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    "locale": "en",
    "required": true,
    "form": "form"
  };
  public readonly timepickerConfig = {
    "hide-header": true,
    "minutes-step": 15,
    "locale": "en",
    "required": true,
    "form": "form"
  };
  public defaultClass: IClass;
  public defaultForm: ICertificateForm;
  public form: ICertificateForm;
  protected submitProgress: number = 0;
  protected show: boolean = true;
  protected bvModal!: BvModalWrapper;
  protected regExp: RegExpCollection = regExp;

  public constructor() {
    super();

    if (this.$store.getters.appFirstLoad) {
      this.$store.commit("defaultClass", {
        name: "",
        finalDate: dayjs().format("YYYY-MM-DD"),
        finalTime: roundMinutes(dayjs(), 15).format("HH:mm:00")
      } as IClass);
      this.$store.commit("defaultForm", this.newForm(this.$store.getters.defaultClass));
      this.$store.commit("form", this.newForm(this.$store.getters.defaultClass));
      this.$store.commit("appHasLoaded");
    }

    this.defaultClass = this.$store.getters.defaultClass;
    this.defaultForm = this.$store.getters.defaultForm;
    this.form = this.$store.getters.form;
  }

  public async created(): Promise<void> {
    // @DEBUG Log active environment variables
    if (process.env.NODE_ENV === "development" && process.env.VUE_APP_DEBUG === "verbose") {
      console.log("Environment variables:", process.env);
    }

    // Wait a tick to allow the Vue component to complete instantiation
    await this.$nextTick();

    // Pass initialized Vue component to our BvModal wrapper
    this.bvModal = new BvModalWrapper(this);

    // Get reference to the validation observer
    const observer = this.observer;

    // Validate immediately based on existing data in the store
    if (this.submitAttempted) {
      await observer.validate();
    }
  }

  public newForm(defaultClass?: IClass): ICertificateForm {
    // Workaround for class properties being undefined within the constructor
    defaultClass = !defaultClass ? this.defaultClass : defaultClass;
    const {name, finalDate, finalTime} = defaultClass;

    return {
      class: {name, finalDate, finalTime},
      numberOfStudents: null,
      students: []
    };
  }

  public async onNumberOfStudentsChanged(formNumberOfStudents: number): Promise<void> {
    // Invalid form input
    if (
      formNumberOfStudents === null || ![1, 2].includes(formNumberOfStudents.toString().length)) {
      return;
    }

    const numberOfStudents = Number(formNumberOfStudents);

    // Invalid number of students
    if (!Number.isInteger(numberOfStudents) || numberOfStudents < this.minStudents) {
      return;
    }

    // Limit maximum students
    const studentsBefore: number = this.form.students.length;
    const studentsNow: number = Math.min(numberOfStudents, this.maxStudents);

    // Create additional students (if necessary)
    for (let i = studentsBefore; i < studentsNow; i++) {
      this.form.students.push(new Student(i));
    }

    // If submit wasn't previously attempted, then nothing else to do
    if (!this.submitAttempted) {
      return;
    }

    // Allow new student forms to instantiate, then update validation state
    await this.$nextTick();
    await this.observer.validate();
  }

  public async onValidate(callback: () => Promise<void>): Promise<void> {
    const validated = await this.observer.validate();

    if (validated) {
      return await callback();
    }

    try {
      await this.bvModal.msgBoxError("Please fix the errors in the form before submitting.");
    } catch (error) {
      this.bvModal.msgBoxFallback(error);
    }
  }

  public async onSubmit(): Promise<void> {
    if (!this.formSubmittable) {
      return;
    }

    const validated = await this.submitValidate();
    if (!validated) {
      // Undo submit attempt, but preserve form contents
      this.commitFormStateReset();
      this.observer.reset();

      return;
    }

    // Trim all text fields
    this.trimFormTextFields();

    // Display submit review modal for confirmation
    this.submitConfirm();
  }

  public async onReset(): Promise<void> {
    if (this.formPristine) {
      return;
    }

    if (!this.formClean) {
      const confirmed = await this.resetConfirm();
      if (!confirmed) {
        return;
      }
    }

    this.resetForm();
  }

  public onSubmitReviewDismissed(): void {
    // Undo submit attempt, but preserve form contents
    this.commitFormStateReset();
    this.observer.reset();

    return;
  }

  public async onSubmitReviewOK(): Promise<void> {
    // Permanently discard surplus students
    this.form.students = this.filteredStudents;

    await this.processSubmission();
  }

  public onSubmitSuccessOK(): void {
    this.resetForm();
  }

  public async submitValidate(): Promise<boolean> {
    // Validate class name (printable ascii)
    const className = this.form.class.name;
    if (!isStringPrintableASCII(className)) {
      try {
        await this.bvModal.msgBoxError(`Class Name "${className}" has invalid characters.`);
      } catch (error) {
        this.bvModal.msgBoxFallback(error);
      }
      return false;
    }

    // Validate student names (alphanumeric, whitespace, underscore, comma, and parens)
    const students = this.filteredStudents;
    const studentCount = students.length;
    for (let i = 0; i < studentCount; i++) {
      const student = students[i];
      if (!isStringS3Safe(student.name)) {
        try {
          await this.bvModal.msgBoxError(
            `Student ${student.id1Based}'s Name "${student.name}" has invalid characters.`
          );
        } catch (error) {
          this.bvModal.msgBoxFallback(error);
        }
        return false;
      }
    }

    return true;
  }

  public submitConfirm(): void {
    this.$bvModal.show("modal-submit-review");
  }

  public async resetConfirm(): Promise<boolean> {
    let choice = null;

    try {
      choice = await this.bvModal.msgBoxConfirm("There is no undo for this action.", {
        title: "Clear all form info?",
        okVariant: "danger",
        okTitle: "YES",
        cancelTitle: "NO"
      });
    } catch (error) {
      this.bvModal.msgBoxFallback(error);
    }

    return choice;
  }

  public async processSubmission(): Promise<void> {
    // @DEBUG Log submitted form data
    if (process.env.NODE_ENV === "development" && process.env.VUE_APP_DEBUG === "verbose") {
      console.log("Submitted form:", this.form);
    }

    // Display submit processing modal
    this.submitProgress = 0;
    this.$bvModal.show("modal-submit-processing");

    // Create jobs and prep jobrunner
    const jobs = JobFactory.createJobs(this.form);
    const jobRunner = new JobRunner(jobs);

    // Bind jobrunner progress to the modal progress bar
    const progressCallback = (runCompletion: number): void => {
      this.submitProgress = runCompletion;
    };

    // Begin work
    try {
      await jobRunner.run(progressCallback);
    } catch (error) {
      // @DEBUG Log on error
      if (process.env.NODE_ENV === "development") {
        console.log(`JobRunner failed: ${error.toString()}`);
      }

      try {
        await this.bvModal.msgBoxError(`Failed to fully process submission: ${error.message}`);
      } catch (error) {
        this.bvModal.msgBoxFallback(error);
      }

      // Undo submit attempt, but preserve form contents
      this.commitFormStateReset();
      this.observer.reset();

      // Hide the processing modal and abort so that the user may retry
      this.$bvModal.hide("modal-submit-processing");
      return;
    }

    // @DEBUG Report when all jobs have finished execution
    if (process.env.NODE_ENV === "development") {
      console.log("All jobs complete!");
    }

    // Display submit success modal
    this.$bvModal.hide("modal-submit-processing");
    this.$bvModal.show("modal-submit-success");
  }

  public async resetForm(): Promise<void> {
    // Reset form fields individually (to preserve object reference with data store)
    this.resetFormFields();

    await this.resetFormState();
  }

  public trimFormTextFields(): void {
    this.form.class.name = cleanString(this.form.class.name);

    const studentCount = this.form.students.length;
    for (let i = 0; i < studentCount; i++) {
      const student = this.form.students[i];
      student.name = cleanString(student.name);
    }
  }

  public resetFormFields(): void {
    const {name, finalDate, finalTime} = this.defaultForm.class;
    const numberOfStudents = this.defaultForm.numberOfStudents;

    this.form.class.name = name;
    this.form.class.finalDate = finalDate;
    this.form.class.finalTime = finalTime;
    this.form.numberOfStudents = numberOfStudents;
    this.form.students = [];
  }

  public async resetFormState(): Promise<void> {
    const topOfPage = this.$refs.topOfPage as HTMLDivElement;

    // Commit state reset to the store
    this.commitFormStateReset();

    // Reset form validation state (form toggling resets the browser validation state)
    this.show = false;
    await this.$nextTick();
    this.show = true;
    this.observer.reset();

    // Scroll to the top of the page
    await this.$nextTick();
    topOfPage.scrollIntoView({behavior: "smooth"});
  }

  public commitSubmitAttempt(): void {
    this.$store.commit("formAttemptedSubmit");
  }

  public commitFormStateReset(): void {
    this.$store.commit("formStateWasReset");
  }

  public getValidationState({valid}: {valid: boolean}): boolean | null {
    return getValidationState({valid}, this.submitAttempted);
  }

  public getValidationStateForSelect({valid}: {valid: boolean}, value?: any): boolean | null {
    return getValidationStateForSelect({valid}, this.submitAttempted, value);
  }

  public get filteredStudents(): Student[] {
    const numberOfStudents = Number(this.form.numberOfStudents);
    if (numberOfStudents < this.minStudents) {
      return [];
    }

    const filteredStudentsCount = Math.min(numberOfStudents, this.maxStudents);
    return this.form.students.slice(0, filteredStudentsCount);
  }

  public get formPristine(): boolean {
    return !this.submitAttempted && this.formClean;
  }

  public get formClean(): boolean {
    return JSON.stringify(this.defaultForm) === JSON.stringify(this.form);
  }

  public get formSubmittable(): boolean {
    return !this.invalidStudents;
  }

  public get invalidStudents(): boolean {
    const numberOfStudents: number = Number(this.form.numberOfStudents);
    return isNaN(numberOfStudents) ||
      numberOfStudents < this.minStudents ||
      numberOfStudents > this.maxStudents;
  }

  public get submitTooltip(): string {
    const prefix: string = "ERROR: You must";

    if (this.invalidStudents) {
      return `${prefix} set a valid number of students.`;
    }

    return "Click to generate student certificates!";
  }

  public get resetTooltip(): string {
    if (this.formPristine) {
      return "";
    }

    return "Click to reset the form back to defaults (no undo).";
  }

  public get observer() {
    return this.$refs.observer as InstanceType<typeof ValidationObserver>;
  }

  public get submitAttempted(): boolean {
    return this.$store.getters.submitAttempted;
  }

  public get minClassName(): number {
    return config.app.className.min;
  }

  public get maxClassName(): number {
    return config.app.className.max;
  }

  public get minStudents(): number {
    return config.app.students.min;
  }

  public get maxStudents(): number {
    return config.app.students.max;
  }

  public get certificateFileType(): string {
    return config.app.certificateFileExtension.toUpperCase();
  }
}
</script>


<style lang="scss">
@import "../styles/Body.scss";

form > .btn:not(:last-child) {
  margin-right: 0.5rem;
}
.btn-danger {
  float: right;
}
.form-group > label {
  font-size: large;
}
.card {
  margin: 1rem 0;
  .card-header {
    color: #f8fafb;
    background-color: #353d45;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.08rem;
  }
  .card-body {
    background-color: #fafafa;
  }
  .form-group:last-child {
    margin-bottom: 0;
  }
}
.modal-content {
  box-shadow: rgba(0, 0, 0, 0.125) 0 8px 24px;
}
.top-of-page {
  position: absolute;
  top: -3.5rem;
  left: 0;
  width: 0;
  height: 0;
}
</style>
