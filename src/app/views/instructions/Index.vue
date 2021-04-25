<template>
<div id="instructions-index">
  <b-container class="mb-3">
    <b-row>
      <b-col cols="12" md="6">
        <b-card header="Text">
          <b-card-text>Written instructions for the certificate process.<br><br></b-card-text>
          <b-button :to="{name: 'instructions-text'}" variant="outline-primary">View Text</b-button>
        </b-card>
      </b-col>
      <b-col cols="12" md="6">
        <b-card header="Video">
          <b-card-text>Video tutorial for the certificate process.<br><small>(recommended)</small></b-card-text>
          <b-button :to="{name: 'instructions-video'}" variant="outline-primary">View Video</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>


<style scoped lang="scss">
.card .card-header {
  text-align: center;
}
.card .btn {
  float: right;
}
</style>
