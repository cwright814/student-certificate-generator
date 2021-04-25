<template>
<b-modal
  id="modal-submit-success"
  title="Submit successful!"
  size="md"
  header-bg-variant="dark"
  header-text-variant="light"
  ok-only
  centered
  @ok="onOK"
>
  <p class="mt-2">Your student certificates for <span class="font-weight-bold">{{ className }}</span> have been generated successfully! 💪</p>
</b-modal>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SubmitSuccess extends Vue {
  @Prop() public className!: string;

  protected onOK(): void {
    this.$emit("ok");
  }
}
</script>
