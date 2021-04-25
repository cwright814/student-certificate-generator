<template>
<div class="student-form">
  <b-card
    :header="student.header"
  >
    <validation-provider
      :name="`Student ${student.id1Based} Full Name`"
      :rules="{
        required: true,
        min: minStudentName,
        max: maxStudentName,
        regex: regExp.safeForS3
      }"
      v-slot="{valid, errors}"
      slim
    >
      <b-form-group
        :id="`student-${student.id}-input-group-name`"
        :label-for="`student-${student.id}-input-name`"
        label="Full Name:"
      >
        <b-form-input
          v-model="student.name"
          :state="getValidationState({valid})"
          :id="`student-${student.id}-input-name`"
          :form="'form'"
          :aria-describedby="`student-${student.id}-live-feedback-name`"
          placeholder="Enter first and last name"
        />
        <b-form-invalid-feedback :id="`student-${student.id}-live-feedback-name`">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </validation-provider>

    <validation-provider
      :name="`Student ${student.id1Based} Award Type`"
      :rules="{
        required: true
      }"
      v-slot="{valid, errors}"
      slim
    >
      <b-form-group
        :id="`student-${student.id}-input-group-awardtype`"
        :label-for="`student-${student.id}-input-awardtype`"
        label="Award Type:"
      >
        <b-form-select
          v-model="student.awardType"
          :state="getValidationState({valid})"
          :id="`student-${student.id}-input-awardtype`"
          :options="awardTypes"
          :form="'form'"
          :aria-describedby="`student-${student.id}-live-feedback-awardtype`"
        ></b-form-select>
        <b-form-invalid-feedback :id="`student-${student.id}-live-feedback-awardtype`">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </validation-provider>
  </b-card>
</div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Student from "../classes/Student";
import AwardType from "../enums/AwardType";
import { getValidationState } from "@/utilities/VeeValidate";
import regExp, { RegExpCollection } from "@/utilities/RegExp";
import config from "@/config.json";

@Component
export default class StudentForm extends Vue {
  @Prop() public student!: Student;
  protected readonly awardTypes = [...Object.values(AwardType)];
  protected regExp: RegExpCollection = regExp;

  public getValidationState({valid}: {valid: boolean}): boolean | null {
    return getValidationState({valid}, this.submitAttempted);
  }

  public get studentNames(): string[] {
    return this.$store.getters.form.students.map((student: Student) => student.name);
  }

  public get submitAttempted(): boolean {
    return this.$store.getters.submitAttempted;
  }

  protected get minStudentName(): number {
    return config.app.studentName.min;
  }

  protected get maxStudentName(): number {
    return config.app.studentName.max;
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  &:last-child {
    margin-bottom: 0;
  }
  .card-header {
    background-color: #47525c;
    text-transform: unset;
    letter-spacing: inherit;
  }
  .card-body {
    padding-top: 1rem;
    background-color: #f2f2f2;
  }
}
</style>
