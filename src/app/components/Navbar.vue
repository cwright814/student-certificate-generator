<template>
<b-navbar toggleable="lg" type="light" variant="info" fixed="top">
  <b-navbar-brand><navbar-logo/>Student Certificate Generator</b-navbar-brand>

  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

  <b-collapse id="nav-collapse" is-nav>
    <b-navbar-nav id="nav">
      <b-nav-item :to="{name: 'generator'}">Generator</b-nav-item>
      <b-nav-item :to="{name: 'instructions'}" active-class="router-link-parent-active">Instructions</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavbarLogo from "../components/NavbarLogo.vue"; // @ is an alias to /src

@Component({
  components: {
    NavbarLogo
  }
})
export default class Navbar extends Vue {}
</script>


<style scoped lang="scss">
@import "../styles/DefaultTheme.scss";

nav {
  background-color: map-get($theme-colors, "navbar-bg") !important;
  border-bottom: 2px solid map-get($theme-colors, "navbar-border");
  box-shadow: rgba(0, 0, 0, 0.3) 0 -16px 16px 16px;
  text-align: center;
}
#nav {
  a {
    font-size: 1.25rem;
    color: map-get($theme-colors, "text-darker");
    @media (max-width: 991px) {
      &:hover, &.router-link-exact-active, &.router-link-parent-active {
        color: map-get($theme-colors, "nav-select-mobile") !important;
        text-shadow: 1px  0px 0px #785b02d6,
                    -1px  0px 0px #785b02d6,
                     0px  1px 0px #785b02d6,
                     0px -1px 0px #785b02d6,
                     0px  0px 2px #000000ff;
      }
    }
  }
  .nav-link {
    padding-bottom: 0;
  }
}
@media (min-width: 992px) {
  #nav {
    margin-left: auto;
    margin-right: auto;
    a {
      &.router-link-exact-active,
      &.router-link-parent-active,
      &:hover {
        border-bottom-color: map-get($theme-colors, "nav-select");
        border-bottom-style: solid;
        border-bottom-width: 2px;
        box-shadow: #69531180 0 1px 1px -1px;
      }
    }
  }
  #nav-collapse {
    // Force full width regardless of branding
    position: absolute;
    width: 100%;
    left: 0;
    top: 0.5rem;
    bottom: 0.5rem;
  }
  .navbar-expand-lg .navbar-nav .nav-link {
    padding: 0;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}
.navbar-brand {
  max-width: calc(100vw - 104px);
  min-width: 90px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: map-get($theme-colors, "text-darker") !important;
}
</style>
