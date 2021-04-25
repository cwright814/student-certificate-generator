<template>
<div id="generator">
  <h1>Certificate Form</h1>
  <certificate-form/>
</div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CertificateForm from "../components/CertificateForm.vue";

@Component({
  components: {
    CertificateForm
  }
})
export default class Generator extends Vue {}
</script>
