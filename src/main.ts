import Vue from "vue";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { far } from "@fortawesome/free-regular-svg-icons";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { defineValidationRules } from "./validation";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// library.add(far, fas);
// Vue.component("font-awesome-icon", FontAwesomeIcon);

defineValidationRules();

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
