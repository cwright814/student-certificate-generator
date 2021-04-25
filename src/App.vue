<template>
<div id="app">
  <navbar/>
  <div class="h-100 container-fluid d-flex flex-column">
    <div class="row flex-grow-0">
      <div class="page col-12 col-sm-8 col-lg-6 offset-sm-2 offset-lg-3">
        <router-view/>
      </div>
    </div>
    <Footer/>
  </div>
</div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/app/components/Navbar.vue"; // @ is an alias to /src
import Footer from "@/app/components/Footer.vue";

@Component({
  components: {
    Navbar,
    Footer
  }
})
export default class App extends Vue {}
</script>


<style lang="scss">
@import "@/app/styles/DefaultTheme.scss";
$nav-offset: 3.5rem;

html,body,#app {
  height: calc(100vh - #{$nav-offset}) !important;
}
body {
  min-width: 320px;
  background-color: map-get($theme-colors, "body-bg") !important;
  overflow-y: scroll !important;
  padding-right: unset !important;
}
h1 {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.0875rem;
  overflow: hidden;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: map-get($theme-colors, "text-dark");
  &:nth-child(2) {
    margin-top: $nav-offset;
  }
}
.page {
  padding-top: 2rem;
  box-shadow: rgba(0, 0, 0, 0.125) 0 0 32px;
  background-color: map-get($theme-colors, "page-bg");
}
.c-default {
    cursor: default !important;
}
.c-pointer {
    cursor: pointer !important;
}
// Workarounds for Internet Explorer
.flex-grow-0 {
  flex: 0 0 auto;
}
.flex-grow-1 {
  flex: 1 1 auto;
}
</style>
