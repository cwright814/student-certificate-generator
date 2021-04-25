<template>
<footer class="d-flex flex-column flex-grow-1">
  <div class="row flex-grow-1">
    <!-- Spacer -->
  </div>
  <div class="footer row flex-grow-0">
    <div class="col-12">
      <span>© The Wright Reason. All rights reserved.</span>
    </div>
  </div>
</footer>
</template>


<style scoped lang="scss">
$footer-offset: 1.5rem;
footer {
  margin-top: $footer-offset;
}
.footer {
  @import "../styles/DefaultTheme.scss";

  background-color: map-get($theme-colors, "footer-bg") !important;
  padding: 35px 0;
  text-align: center;

  span {
    font-size: 0.75rem;
    color: #fff;
    opacity: 0.6;
  }
}
</style>
