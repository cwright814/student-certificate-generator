<template>
<b-modal
  id="modal-submit-processing"
  title="Processing submission..."
  header-bg-variant="dark"
  header-text-variant="light"
  hide-header-close
  hide-footer
  no-close-on-backdrop
  no-close-on-esc
  centered
>
  <b-progress
    class="mt-2"
    :value="submitProgress"
    max="1"
    height="1.5rem"
    show-progress
    striped
    animated
  ></b-progress>
  <div class="mt-3">Do not close this window.</div>
</b-modal>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SubmitProcessing extends Vue {
  @Prop() public submitProgress!: number;
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
