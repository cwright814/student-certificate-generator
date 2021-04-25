<template>
<b-modal
  id="modal-submit-review"
  title="Review your submission"
  size="lg"
  header-bg-variant="dark"
  header-text-variant="light"
  ok-title="Looks good"
  cancel-title="Go back"
  centered
  @show="onShow"
  @hide="onHide"
>
  <p class="mt-2 mb-4">Please review the {{ studentCount }} student(s) for <span class="font-weight-bold">{{ className }}</span> to ensure everyone is accounted for, names do not contain typos, and award types are correct. ↴</p>
  <b-table
    :items="tableData"
    :fields="tableFields"
    stacked="sm"
    small
    striped
    outlined
    sort-icon-left
  >
    <template #cell(warnings)="row">
      <div v-if="row.item.nameExistsTwice(studentNames)">
        <span
          :id="`student-${row.item.id}-warning`"
          class="c-default"
          tabindex="0"
        >
          ⚠
        </span>
        <b-tooltip
          :target="`student-${row.item.id}-warning`"
          title="Student Name is duplicated"
        />
      </div>
    </template>
  </b-table>
</b-modal>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BvModalEvent } from "bootstrap-vue/src/components/modal";
import Student from "../../classes/Student";
import { includesTwice } from "@/utilities/Array";

@Component
export default class SubmitReview extends Vue {
  @Prop() public students!: Student[];
  @Prop() public className!: string;
  protected studentNames: string[] = [];

  protected get tableData() {
    return this.students;
  }

  protected get tableFields() {
    return [
      {
        key: "name",
        label: "Student Name",
        sortable: true,
        class: "sort-offset"
      },
      {
        key: "awardType",
        label: "Award Type",
        sortable: true,
        class: "sort-offset"
      },
      {
        key: "warnings",
        label: "Warnings",
        class: "text-sm-center"
      }
    ];
  }

  protected onShow(): void {
    this.studentNames = this.students.map((student: Student) => student.name);

    if (this.duplicateStudentNames()) {
      this.$bvToast.toast("One or more student names are duplicated. Please ensure that this was intentional.", {
        title: "Duplicate students detected",
        autoHideDelay: 10000,
        variant: "warning"
      });
    }
  }

  protected onHide(bvModalEvent: BvModalEvent): void {
    // Check if dismissed
    if (bvModalEvent.trigger !== "ok") {
      this.$emit("dismiss");
      return;
    }

    this.$emit("ok");
  }

  protected duplicateStudentNames(): boolean {
    const studentCount = this.studentCount;

    for (let i = 0; i < studentCount; i++) {
      const student = this.students[i];

      if (includesTwice(this.studentNames, student.name)) {
        return true;
      }
    }

    return false;
  }

  protected get studentCount(): number {
    return this.students ? this.students.length : 0;
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (min-width: 576px) {
  /deep/ #modal-submit-review td.sort-offset {
    padding-left: calc(0.3rem + 0.65em);
  }
}
</style>
